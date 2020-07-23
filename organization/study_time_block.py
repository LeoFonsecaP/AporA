import json

class StudyTimeBlock:
    def __init__(self, week_day, hour, subject=None):
        self.__week_day = week_day
        self.__hour = hour
        self.__subject = subject

    def set_subject(self, subject):
        self.__subject = subject

    def set_hour(self, hour):
        self.__hour = hour

    def set_week_day(self, week_day):
        return self.__week_day

    def get_subject(self):
        return self.__subject

    def get_hour(self):
        return self.__hour

    def get_week_day(self):
        return self.__week_day

    def get_hours_relative_to_week(self):
        return self.__week_day * 24 + self.__hour

    def __str__(self):
        return 'weekDay: %d, hour: %d, subject: %s'\
            %(self.__week_day, self.__hour, self.__subject)

    def to_json(self):
        return json.dumps({
            'weekDay': self.__week_day,
            'hour': self.__hour,
            'subject': self.__subject
        });
