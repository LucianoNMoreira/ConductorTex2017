#-*- coding: utf-8 -*-
##########################################################################
###### States values have short names, while Google needs full name ######
###### This extracts fullname and create right final json.          ######
##########################################################################

import json
import locale
locale.setlocale(locale.LC_ALL, 'pt_BR')

class StateValue():
    def __init__(self, state, value):
        self.state = state
        self.value = value

    def dump(self):
        return {'state': self.state, 'value': self.value}

#Parse state names
state_name={}
with open('./estados.json') as data_file:    
    data = json.load(data_file)

for state in data['estados']:
    state_name[state['sigla']] = state['nome']

#Parse states values
values=[]
with open('./output.json') as data_file:    
    data = json.load(data_file)
for row in data:
    # state_value[state_name[row['name']]] = row['value']
    values.append(StateValue(
        state_name[row['name']],
        locale.atof(row['value'].replace("R$ ", ""))
    ))

# print values

text_file = open("values-json.json", "w")
text_file.write(json.dumps([o.dump() for o in values], ensure_ascii=False).encode('UTF-8'))
text_file.close()