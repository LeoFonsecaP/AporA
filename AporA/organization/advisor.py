import math

STRENGTHS_WEIGHT = 1
NEUTRAL_WEIGHT = 2
WEAKNESSES_WEIGHT = 4
TOTAL_NUMBER_OF_SUBJECTS = 10

class StudysAdvisor:
    def __init__(self, available_time_blocks, weaknesses, strengths):

        self.allocated_times = map(
            lambda time_block: time_block['allocatedTime'],
             available_time_blocks
        )
        self.students_available_time = sum(self.allocated_times, 0)
        self.weaknesses = weaknesses
        self.strengths = strengths

        subjects_time = {
            'Port': NEUTRAL_WEIGHT,
            'Mat': NEUTRAL_WEIGHT,
            'Quim': NEUTRAL_WEIGHT,
            'Fis': NEUTRAL_WEIGHT,
            'Hist': NEUTRAL_WEIGHT,
            'Geo': NEUTRAL_WEIGHT,
            'Bio': NEUTRAL_WEIGHT,
            'Ing': NEUTRAL_WEIGHT,
            'Soci': NEUTRAL_WEIGHT,
            'Filo': NEUTRAL_WEIGHT,
            'Reda': NEUTRAL_WEIGHT,
        }

        for weakness in weaknesses:
            subjects_time[strength] = STRENGTHS_WEIGHT 

        print(subjects_time)
        
    def generate_routine(self):
        return None