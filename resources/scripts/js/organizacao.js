import { UserEditableCalendar } from './modules/calendar/UserEditableCalendar.js';
import { DisplayOnlyCalendar } from './modules/calendar/DisplayOnlyCalendar.js';
import { WeekRelativeDate } from './modules/calendar/WeekRelativeDate.js';
import { DjangoRequest } from './modules/django/DjangoRequest.js'
import { REQUEST_TYPES } from './modules/django/DjangoRequest.js'
    
const contentContainer = document.getElementsByClassName('content')[0];

const EMPTY_SUBJECT = 'Selecione uma matéria';
const REPEATED_SUBJECTS = 'Não é permitido escolher a mesma matéria duas vezes'

function main() {
    const calendarContainer = document.getElementById('calendarContainer');
    const easySubjects = document.getElementsByClassName('easy_subject');
    const difficultSubjects = document.getElementsByClassName('dificult_subject');
    const subjectsColletion = [
        easySubjects[0], easySubjects[1],
        difficultSubjects[0], difficultSubjects[1]
    ];
    listenForRepeatedSubjects(subjectsColletion);

    const calendar = new UserEditableCalendar(
        calendarContainer, 'selected_activity'
    );
    calendar.run();

    const submitButton = document.getElementById('submitButton');
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (!subjectChoicesAreValid(subjectsColletion))
            renderErrorMessage('Todos os campos devem ser selecionados');
        else 
            clearErrorMessage();
        if (document.getElementById('errorLogging').innerHTML !== '')
            return;
        const requestData = buildRequestData(
            easySubjects, difficultSubjects, calendar
        );
        const request = new DjangoRequest(REQUEST_TYPES.POST);
        request.send(requestData, renderResponse);
    });
}

function listenForRepeatedSubjects(subjects) {
    let areValid = [true, true, true, true];
    const length = subjects.length;

    for (let i = 0; i < subjects.length; i++) {
        subjects[i].addEventListener('change', (event) => {
            for (let j = 1; j < subjects.length; j++) {
                if (subjects[i].value === subjects[(i + j) % length].value) {
                    areValid[i] = false;
                    renderErrorMessage(REPEATED_SUBJECTS);
                    return;
                }
            }
            areValid[i] = true;
            let shouldClearError = areValid.reduce((accumulator, isValid) => {
                return accumulator && isValid;
            });
            if (shouldClearError)
                clearErrorMessage(); 
        })
    }
}

function subjectChoicesAreValid(subjects) {
    for (let i = 0; i < subjects.length; i++) {
        if (subjects[i].value === EMPTY_SUBJECT)
            return false;
    }
    return true;
}

function renderResponse(response) {
    const parsed_response = JSON.parse(response);
    if (parsed_response.error !== '') {
        renderErrorMessage(parsed_response.error);
        return;
    }
    contentContainer.innerHTML = '';
    renderCalendarFromResponse(parsed_response.routine);
    setupRoutineDownload();
}

function renderErrorMessage(errorMessage) {
    const htmlErrorElement = document.getElementById('errorLogging');
    htmlErrorElement.innerHTML = errorMessage;
}

function clearErrorMessage() {
    const htmlErrorElement = document.getElementById('errorLogging');
    htmlErrorElement.innerHTML = '';
}

function renderCalendarFromResponse(routine) {
    const calendarDisplay = document.createElement('div');
    calendarDisplay.className = 'calendar_display';
    const calendarContainer = document.createElement('div');
    calendarContainer.className = 'calendar_container';
    contentContainer.appendChild(calendarDisplay);
    calendarDisplay.appendChild(calendarContainer);

    const calendar = new DisplayOnlyCalendar(
        calendarContainer, 'selected_activity'
    );
    calendar.run();

    routine.forEach((studyBlock) => {
        const date = new WeekRelativeDate(studyBlock.weekDay, studyBlock.hour);
        calendar.addActivity(date, 1, studyBlock.subject);
    });
}

function setupRoutineDownload() {
    const container = document.getElementsByClassName('calendar_container')[0];

    const linkWrapper = document.createElement('div');
    linkWrapper.className = 'button';
    linkWrapper.innerHTML = 'Download';

    const link = document.createElement('a');
    link.download = true;
    link.style.display = 'none';
   
    linkWrapper.appendChild(link);
    contentContainer.appendChild(linkWrapper);

    link.addEventListener('click', (event) => {
        event.stopPropagation();
    })

    linkWrapper.addEventListener('click', (event) => {
        console.log('button clicked');
        const scrollBackup = container.parentNode.scrollTop;
        container.parentNode.scrollTop = '0';
        container.parentNode.overflow = 'hidden';
        
        html2canvas(container).then((canvas) => {
            link.href = canvas.toDataURL('image/png', 1);
            link.click();
        }).then(() => {
            container.parentNode.overflowY = 'scroll';
            container.parentNode.scrollTop = scrollBackup;
        });
    })
}

function buildRequestData(easySubjects, difficultSubjects, calendar) {
    return '{"easySubjects":[' + '"' + easySubjects[0].value +
        '","' + easySubjects[1].value + '"], "difficultSubjects":["' +
        difficultSubjects[0].value + '","' + difficultSubjects[1].value +
        '"],"availableHours":' + calendar.toJson() + '}';
}

window.onload = main;
