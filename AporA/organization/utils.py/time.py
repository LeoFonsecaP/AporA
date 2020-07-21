class WeekTime:
    def __init__(self, user, study_blocks):
        self.study_blocks = study_blocks
    
    def to_study_blocks_models(self):
        return None  

class TimeBlock:
    def __init__(self, week_day, start_hour, allocated_time, activity):
        self.week_day = week_day
        self.start_hour = start_hour
        self.allocated_time = allocated_time