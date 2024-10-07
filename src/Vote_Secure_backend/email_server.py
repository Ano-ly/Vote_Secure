from flask import Flask, jsonify
import requests

app = Flask(__name__)

@app.route('/fetch_voter_data', methods=['GET'])
def fetch_voter_data():
    
    motoko_actor_url = 'https://m7sm4-2iaaa-aaaab-qabra-cai.raw.ic0.app/?tag=1765697256/sendVotersEmail'
    response = requests.get(motoko_actor_url)
    voter_data = response.json()
    return jsonify(voter_data)

if __name__ == '__main__':
    app.run(port=5000)