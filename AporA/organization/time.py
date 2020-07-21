class TimeBlock:
    def __init__(self, week_day, start_hour, allocated_time):
        self.week_day = week_day
        self.start_hour = start_hour
        self.allocated_time = allocated_time

class StudyBlock:
    def __init__(self, time_block, subject):
        self.time_block = time_block
        self.subject = subject 
