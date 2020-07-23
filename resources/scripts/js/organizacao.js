import { UserEditableCalendar } from './modules/calendar/UserEditableCalendar.js';
import { DisplayOnlyCalendar } from './modules/calendar/DisplayOnlyCalendar.js';
import { WeekRelativeDate } from './modules/calendar/WeekRelativeDate.js';
    
const contentContainer = document.getElementsByClassName('content')[0];

const EMPTY_SUBJECT = 'Selecione uma materia';
const REPEATED_SUBJECTS = 'Nao e permitido escolher a mesma materia duas vezes'

function main() {
    const calendarContainer = document.getElementById('calendarContainer');
    const easySubjects = document.getElementsByClassName('easy_subject');
    const difficultSubjects = document.getElementsByClassName('dificult_subject');
    const subjectsColletion = [
        easySubjects[0], easySubjects[1],
        difficultSubjects[0], difficultSubjects[1]
    ];
    for (let i = 0; i < subjectsColletion.length; i++) {
        const otherSubjects = subjectsColletion.filter((subject) => {
            return subjectsColletion[i] !== subject;
        });
        listenForRepeatedSubjects(subjectsColletion[i], otherSubjects);
    }

    const calendar = new UserEditableCalendar(
        calendarContainer, 'SelectedActivity'
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
        sendRequest(requestData);
    });
}

function listenForRepeatedSubjects(listenedSubject, otherSubjects) {
    let errorFlag = false;
    listenedSubject.addEventListener('change', (event) => {
        for (let i = 0; i < otherSubjects.length; i++) {
            if (listenedSubject.value === otherSubjects[i].value) {
                renderErrorMessage(REPEATED_SUBJECTS);
                errorFlag = true;
                return;
            }
        }
        errorFlag = false;
        clearErrorMessage(); 
    })
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
    const calendarContainer = document.createElement('div');
    calendarContainer.className = 'CalendarContainer';
    contentContainer.appendChild(calendarContainer);

    const calendar = new DisplayOnlyCalendar(
        calendarContainer, 'SelectedActivity'
    );
    calendar.run();

    routine.forEach((studyBlock) => {
        const date = new WeekRelativeDate(studyBlock.weekDay, studyBlock.hour);
        calendar.addActivity(date, 1, studyBlock.subject);
    });
}

function sendRequest(requestData) {
    const request = new XMLHttpRequest();
    request.open('POST', '');
    setDjangoEnforcedRequestHeaders(request);
    request.onload = () => renderResponse(request.response);
    request.send(requestData);
}

function setDjangoEnforcedRequestHeaders(request) {
    const csrfToken = Cookies.get('csrftoken');
    request.setRequestHeader('HTTP_X_REQUESTED_WITH', 'XMLHttpRequest');
    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    request.setRequestHeader("X-CSRFToken", csrfToken);
    request.setRequestHeader('Content-Type', 'application/json');
}

function buildRequestData(easySubjects, difficultSubjects, calendar) {
    return '{"easySubjects":[' + '"' + easySubjects[0].value +
        '","' + easySubjects[1].value + '"], "difficultSubjects":["' +
        difficultSubjects[0].value + '","' + difficultSubjects[1].value +
        '"],"availableHours":' + calendar.toJson() + '}';
}

window.onload = main;
