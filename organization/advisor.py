from organization.models import StudyTimeBlock
import functools
import math

STRENGTHS_WEIGHTS = 1
NEUTRAL_WEIGHTS = 2
WEAKNESSES_WEIGHTS = 4

STRENGTHS_CYCLE_INDEXES = [6, 15]
WEEKNESSES_CYCLE_INDEXES = [0, 3, 7, 10, 13, 17, 20, 23]
NEUTRALS_CYCLE_INDEXES = [1, 2, 4, 5, 6, 11, 12, 14, 15, 16, 18, 19, 21, 22]

TOTAL_NUMBER_OF_SUBJECTS = 10

SUBJECTS = [
    'Portugues', 'Redacao', 'Ingles', 'Matematica', 'Fisica', 'Quimica',
    'Geografia', 'Historia', 'Biologia', 'Sociologia', 'Filosofia'
]

class StudentAdvisor:
    def __init__(self, advisee, advisees_weaknesses, advisees_strengths):
        self.advisee = advisee
        self.advisees_strengths = advisees_strengths
        self.advisees_weaknesses = advisees_weaknesses

        self.neutral_subjects = SUBJECTS.copy()
        for strength in self.advisees_strengths:
            self.neutral_subjects.remove(strength)
        for weakness in self.advisees_weaknesses:
            self.neutral_subjects.remove(weakness)

    def generate_routine(self, week_available_time):
        study_time_blocks = self._generate_study_time_blocks(week_available_time)
        #sorted(study_time_blocks, key=time_block_to_hours)
        self._select_subject_for_study_time_blocks(study_time_blocks)
        return study_time_blocks

    def _generate_study_time_blocks(self, week_available_time):
        separated_avaliable_time = [] 
        for available_time in week_available_time:
            splitted_time = self._split_available_time(available_time)
            separated_avaliable_time.append(splitted_time)

        return functools.reduce(
            (lambda acc, splitted_time : acc + splitted_time),
            separated_avaliable_time, []
        ) 

    def _calculate_number_of_study_cycles(self, number_of_study_time_blocks):
        reserved_for_strengths = len(self.advisees_strengths) * STRENGTHS_WEIGHTS
        reserved_for_weaknesses = len(self.advisees_weaknesses) * WEAKNESSES_WEIGHTS
        reserved_for_neutral = len(SUBJECTS) * NEUTRAL_WEIGHTS - reserved_for_strengths\
            - reserved_for_weaknesses
        return math.floor(
            number_of_study_time_blocks / (reserved_for_neutral\
            + reserved_for_strengths + reserved_for_weaknesses)
        )

    def _select_subject_for_study_time_blocks(self, study_time_blocks):
        number_of_study_time_blocks = len(study_time_blocks)
        number_of_study_cycles = self._calculate_number_of_study_cycles(
            number_of_study_time_blocks
        )
        for cycle in range(number_of_study_cycles):
            base_index = cycle * 24
            study_time_blocks[base_index + STRENGTHS_CYCLE_INDEXES[0]].subject = self.advisees_strengths[0]
            study_time_blocks[base_index + STRENGTHS_CYCLE_INDEXES[1]].subject = self.advisees_strengths[1]
            for i in range(len(self.advisees_weaknesses) * WEAKNESSES_WEIGHTS):
                study_time_blocks[base_index + WEEKNESSES_CYCLE_INDEXES[i]].subject = self.advisees_weaknesses[i % 2]
            neutral_subjects_counter = 0
            for study_time_block in study_time_blocks[base_index: base_index + 24]:
                if (study_time_block.subject == ''):
                    study_time_block.subject = self.neutral_subjects[neutral_subjects_counter % len(self.neutral_subjects)]
                    neutral_subjects_counter += 1
        for study_time_block in study_time_blocks[number_of_study_cycles * 24:number_of_study_time_blocks]:
            study_time_block.subject = 'Livre'


    def _split_available_time(self, available_time_block):
        one_hour_time_blocks = []
        for hour in range(available_time_block['allocatedTime']):
            one_hour_time_blocks.append(
                StudyTimeBlock(
                    user=self.advisee,
                    week_day=available_time_block['weekDay'],
                    start_hour=available_time_block['startHour'] + hour,
                    allocated_time=1
                )
            )
        return one_hour_time_blocks