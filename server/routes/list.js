import express from 'express'
import axios from 'axios'
import firebase from '../../plugins/firebase'
import querystring from 'querystring'

const router = express.Router()
// router.use(express.json())

const API_KEY = 'AIzaSyAqNjCDwR3gxEIrslaQkqih368n8OkpRo4'

// router.get('/videos', (req, res) => {
//   axios.get('https://www.googleapis.com/youtube/v3/videos?part=contentDetails,liveStreamingDetails,localizations,player,recordingDetails,snippet,statistics,status,topicDetails&chart=mostPopular&maxResults=50&key=AIzaSyAqNjCDwR3gxEIrslaQkqih368n8OkpRo4').then((resp) => {
//     res.status(200).send(resp)
//   }).
// })

module.exports = router