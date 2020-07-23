from organization.study_time_block import StudyTimeBlock
from organization.study_subjects_cycle import StudySubjectsCycle
import functools

SUBJECTS = [
    'Portugues', 'Redacao', 'Ingles', 'Matematica', 'Fisica', 'Quimica',
    'Geografia', 'Historia', 'Biologia', 'Sociologia', 'Filosofia'
]

class StudentAdvisor:
    def __init__(self, advisees_weaknesses, advisees_strengths):
        neutral_subjects = SUBJECTS.copy()
        for strength in advisees_strengths:
            neutral_subjects.remove(strength)
        for weakness in advisees_weaknesses:
            neutral_subjects.remove(weakness)

        self.__study_cycle = StudySubjectsCycle(
            advisees_weaknesses, advisees_strengths, neutral_subjects
        ).get_cycle()

    def generate_routine(self, week_available_time):
        study_time_blocks = self.__generate_study_time_blocks(week_available_time)
        if len(study_time_blocks) < len(self.__study_cycle):
            raise Exception('O minimo de tempo livre na semana e de 24 horas')
        return self.__select_subject_for_study_time_blocks(study_time_blocks)

    def __select_subject_for_study_time_blocks(self, study_time_blocks):
        study_time_blocks = sorted(
            study_time_blocks,
            key=(lambda time_block: time_block.get_week_day()*24
                + time_block.get_hour())
        )
        for i in range(len(study_time_blocks)):
            length = len(self.__study_cycle)
            subject = self.__study_cycle[i % length]
            study_time_blocks[i].set_subject(subject) 
        return study_time_blocks
        
    def __generate_study_time_blocks(self, week_available_time):
        separated_avaliable_time = [] 
        for time_block in week_available_time:
            splitted_time = self.__split_available_time_block(time_block)
            separated_avaliable_time.append(splitted_time)

        return functools.reduce(
            (lambda acc, splitted_time : acc + splitted_time),
            separated_avaliable_time, []
        ) 

    def __split_available_time_block(self, available_time_block):
        one_hour_time_blocks = []
        for hour in range(available_time_block['allocatedTime']):
            one_hour_time_blocks.append(
                StudyTimeBlock(
                    week_day=available_time_block['weekDay'],
                    hour=available_time_block['startHour'] + hour,
                )
            )
        return one_hour_time_blocks
