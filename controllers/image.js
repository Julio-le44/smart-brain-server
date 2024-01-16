export const handleAPI = (req,res) => {
    const PAT = 'a1a4bb8e478a47c287bc42e186548951';
    const USER_ID = 'julio-le44';       
    const APP_ID = 'face_detection';
    const MODEL_ID = 'face-detection';    
    const IMAGE_URL = req.body.url;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
      
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
    .then(response => response.json())
    .then(result => res.json(result))
    .catch(err => res.json('unable to connect with Clarify API'))
}

export const handleImage = (req, res, db) => {
    const {id}= req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => res.json(entries[0].entries))
    .catch(err => res.status(400).json('unable to get entries'))
}

