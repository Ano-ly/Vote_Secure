from mailjet_rest import Client
import requests

api_key = '',
api_secret ='',

mailjet = Client(auth=(api_key, api_secret), version ='v3.1')

def send_voter_email(reciver_email, voter_name, voter_id):
    data = {
        'message' : [
            {
                "From":{
                    "Email": "",
                    "Name": "VoteSecure"
                },
                "To":{
                    "Email": reciver_email,
                    "Name": voter_name
                },
                "Subject": "Your Voter's ID",
                "TextPart": f"Hi {voter_name},\nHere is your Voter ID: {voter_id}. Please use this ID to cast your vote.",
                "HTMLPart": f"<h3>Hi {voter_name},</h3><p>Here is your <b>Voter ID</b>: <b>{voter_id}</b>.</p><p>Please use this ID to cast your vote.</p>",
                "CustomID": "VoterIDEmail"
            }
        ]
    }
    
    result = mailjet.send.create(data=data)
    print(result.status_code)
    print(result.json())
    
    response = requests.get('http://localhost:5000/fetch_voter_data')
    voters = response.json()