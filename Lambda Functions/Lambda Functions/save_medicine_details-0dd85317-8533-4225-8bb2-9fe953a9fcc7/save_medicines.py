import pymysql


def lambda_handler(event, context):
	dialog_state = event['request']['dialogState']
	
	if dialog_state in ("STARTED", "IN_PROGRESS"):
		return continue_dialog()
	elif dialog_state == "COMPLETED":
		intent = event["request"]["intent"]
		slots = intent["slots"]

		medicine = slots["medicine"]["value"]
		next_appointment_date = slots["dateOfAppointment"]["value"]
		till_date = slots["mDate"]["value"]
		mtime = slots["mTime"]["value"] + ":00"

		print(medicine, next_appointment_date, till_date, mtime)

		try:
			host = "medication.c0297vvico7h.us-east-2.rds.amazonaws.com"
			port = 3306
			dbname = "medicalDetails"
			user = "keerthiT02"
			password = "Pari2811"

			conn = pymysql.connect(host, user=user, port=port, passwd=password, db=dbname)
			cursor = conn.cursor()

			query = """insert into appointments(medicine, mtime, till_date, next_appointment_date) 
					   values('{}', '{}', '{}', '{}');""".format(medicine, mtime, till_date, next_appointment_date)

			print(query)

			cursor.execute(query)
			conn.commit()

			output = "For the current appointment, your medicine is " + medicine + " to be taken daily at " + mtime + " till " + till_date + " and your next appointment is on " + next_appointment_date


			return statement("See you on the next appointment doctor, bye")
		
		except Exception as e:
			print(e.message)
			return statement("Failed")
        
	else:
		return statement("Failed")

def continue_dialog():
    message = {}
    message['shouldEndSession'] = False
    message['directives'] = [{'type': 'Dialog.Delegate'}]
    return build_response(message)
		
def statement(body):
    speechlet = {}
    speechlet['outputSpeech'] = build_PlainSpeech(body)
    speechlet['shouldEndSession'] = True
    return build_response(speechlet)

def build_PlainSpeech(body):
    speech = {}
    speech['type'] = 'PlainText'
    speech['text'] = body
    return speech


def build_response(message, session_attributes={}):
    response = {}
    response['version'] = '1.0'
    response['sessionAttributes'] = session_attributes
    response['response'] = message
    return response

	
   

    