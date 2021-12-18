import moment from "moment"

export const getPersonData = (days, id) => {  
  return days.map((e, i) => {
    return <td key={`${i}${id}`} >{e.value}</td>
  })
}
export const sortDuration = (arr, i, dir) => {
  return arr.sort((cur, next) => {
    const a = cur.Days[i - 1].ms;
    const b = next.Days[i - 1].ms;
    return ((a - b) * dir);
  })
}
export const sortTotal = (arr, i, dir) => {
  return arr.sort((cur, next) => {
    const a = cur.total.ms;
    const b = next.total.ms;
    return ((a - b) * dir);
  })
}
export const filter = (dates, term, i, direction) => {
  let filtred = [...dates];
  if(term) {
    filtred = filtred.filter(e => {
      return  e.Fullname
      .toLowerCase()
      .includes(term.toLowerCase())
    })
  }
  if(i && direction) {
    if(i === '32') {
      direction === 1
      ? filtred = sortTotal(filtred, i, -1)
      : filtred = sortTotal(filtred, i, 1);
    } else if (direction === 1) {
      filtred = sortDuration(filtred, i, -1);
    } else if (direction === 2) {
      filtred = sortDuration(filtred, i, 1);
    }
  }
  return filtred;
}
export const getTotalMonth = (days) => {
  const a = moment(`2021-05-01 17:15`);
  const b = moment("2021-05-01 17:15");
  // нулевое значение длительности, полученное из разности равных значений
  const startValue = moment.duration(a.diff(b));

  const total = days.reduce((acc, e) => 
    e.duration === 0 ? acc : acc.add(e.duration)
  , startValue)
  
  return {
    utc: (total.hours()+ (total.days() * 24)) + ':' + total.minutes(),
    ms: total.asMilliseconds()
  }
}
export const dataHandler = (dataSet) => {
  return dataSet.map(data => {
    const days = data.Days;
    let curDay = 0;
    let daySincKoefficient = 1;
    let workTimes = [];
    const nullValues = {
      duration: 0,            
      value: 0,
      ms: 0
    }

    for( let i = 0; i <= 30; i++) {
      
      const date = days[curDay]

      if (curDay >= days.length) {
        workTimes.push(nullValues)
        curDay++; 
      } else if (parseInt(date.Date.slice(8)) !== curDay + daySincKoefficient) {
        workTimes.push(nullValues)
        daySincKoefficient++;
      } else {
        const startTime = date.Start.replace("-", ":")
        const endTime = date.End.replace("-", ":")
        const startMoment = moment(`${date.Date} ${startTime}`);
        const endMoment = moment(`${date.Date} ${endTime}`);
        const duration = moment.duration(endMoment.diff(startMoment));
        
        workTimes.push({
          duration,
          value: duration.hours() + ':' + duration.minutes(),
          ms: duration.asMilliseconds()
        })
        curDay++;
      }
    }
    return { ...data, Days: workTimes, total: getTotalMonth(workTimes) }
  })
}

export const addDragToElement = (element) => {
  if (!element) {
    return
  }
  let isDown = false;
  let startX;
  let scrollLeft;
  
  element.addEventListener('mousedown', (e) => {
    isDown = true;
    element.classList.add('active');
    startX = e.pageX - element.offsetLeft;
    scrollLeft = element.scrollLeft;
  });
  element.addEventListener('mouseleave', () => {
    isDown = false;
    element.classList.remove('active');
  });
  element.addEventListener('mouseup', () => {
    isDown = false;
    element.classList.remove('active');
  });

  element.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - element.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    element.scrollLeft = scrollLeft - walk;  
  });
}