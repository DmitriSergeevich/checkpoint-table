import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import './index.css';
import moment from 'moment';

ReactDom.render(<App/>, document.getElementById('root'))


// let a = "2021-05-01"
// let b = "17:15"
// let c = "12:48"

//  var ab = moment(`2021-05-01 17:15`);
//  var ac = moment("2021-05-01 12:48");
//  var ef = moment(`2021-05-01 14:15`);
//  var eg = moment("2021-05-01 12:48");


// var duration1 = moment.duration(ab.diff(ac));
// var duration2 = moment.duration(ef.diff(eg));
// console.log(moment.min(ab, ac))
// console.log(moment.max(ab, ac))
// console.log(duration.hours() + ':' + duration.minutes())
//console.log(moment(0))
//

