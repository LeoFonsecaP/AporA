import { Calendar } from './modules/Calendar/Calendar.js';
import { CalendarDisplay } from './modules/Calendar/CalendarDisplay.js';
import { EditableActivityDisplayFactory } from './modules/Calendar/EditableActivityDisplayFactory.js';
import { ActivityDisplayFactory } from './modules/Calendar/ActivityDisplayFactory.js';
import { ActivityFactory } from './modules/Calendar/ActivityFactory.js';
import { CalendarMouseActionsMenu } from './modules/Calendar/CalendarMouseMenu.js';
import { WeekRelativeDate } from './modules/Calendar/WeekRelativeDate.js';

function renderCalendarFromJsonObject(container, jsonStudyBlocks) {
    console.log(jsonStudyBlocks);
    const studyBlocks = JSON.parse(jsonStudyBlocks);
    const activityDisplayFactory = new ActivityDisplayFactory('SelectedActivity');
    const calendarDisplay = new CalendarDisplay(container, activityDisplayFactory);
    calendarDisplay.render();

    console.log('rendering calendar');

    const activityFactory = new ActivityFactory();
    const calendar = new Calendar(activityFactory);

    calendar.registerDisplay(calendarDisplay);

    studyBlocks.forEach((studyBlock) => {
        const date = new WeekRelativeDate(studyBlock.weekDay, studyBlock.startHour);
        calendar.addActivity(date, studyBlock.allocatedTime, studyBlock.subject);
    });
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

function main() {
    const container = document.getElementById('calendarContainer');

    const activityDisplayFactory = new EditableActivityDisplayFactory('SelectedActivity');
    const calendarDisplay = new CalendarDisplay(container, activityDisplayFactory);
    calendarDisplay.render();

    const activityFactory = new ActivityFactory();
    const calendar = new Calendar(activityFactory);

    calendar.registerDisplay(calendarDisplay);

    const calendarMenu = new CalendarMouseActionsMenu(calendarDisplay.getCalendarGrid(), calendar);
    calendarMenu.startListening();

    const easySubjects = document.getElementsByClassName('easy_subject');
    const difficultSubjects = document.getElementsByClassName('dificult_subject');

    const submitButton = document.getElementById('submitButton');

    submitButton.addEventListener('click', (event) => {
        event.preventDefault();

        const request = new XMLHttpRequest();
        request.open('POST', '');
        setDjangoEnforcedRequestHeaders(request);
        request.onload = () => {
            const content = document.getElementsByClassName('content')[0];
            content.innerHTML = '';
            const newCalendarContainer = document.createElement('div');
            newCalendarContainer.className = 'CalendarContainer';
            content.appendChild(newCalendarContainer);
            renderCalendarFromJsonObject(newCalendarContainer, request.response);
        };
        const requestData = buildRequestData(
            easySubjects, difficultSubjects, calendar
        );
        request.send(requestData);
    });
}

window.onload = main;