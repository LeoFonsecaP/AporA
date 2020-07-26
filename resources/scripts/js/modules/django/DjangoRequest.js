export const REQUEST_TYPES = {'POST': 'POST', 'GET':'GET'};

export class DjangoRequest {
    constructor(requestType) {
        this.request = new XMLHttpRequest();         
        this.request.open(requestType, '');
        this._setEnforcedHeaders()
    }

    _setEnforcedHeaders() {
        const csrfToken = Cookies.get('csrftoken');
        this.request.setRequestHeader('HTTP_X_REQUESTED_WITH', 'XMLHttpRequest');
        this.request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        this.request.setRequestHeader("X-CSRFToken", csrfToken);
        this.request.setRequestHeader('Content-Type', 'application/json');
    }

    send(requestData, callback) {
        this.request.onload = (() => callback(this.request.response)).bind(this);
        this.request.send(requestData);
    }
}
