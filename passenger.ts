type Passenger = { name: string; location: string };
type Output = {
  boarded: Array<Passenger>;
  reservation: Array<Passenger>;
  count: number;
};
const taskOne = (passengers: number, shuffle: number) => {
  const output: Output = {
    boarded: [],
    reservation: [],
    count: 0,
  };
  let count = 0;
  let startId = 1;
  let endId = passengers;
  let trackCount = passengers;
  let boarded: Array<Passenger> = [];
  let reservation: Array<Passenger> = [];
  function generatePassengers(startId: number, endId: number) {
    const location = ["Abuja", "Benue", "Lagos", "Katsina", "Sambisa"];
    const genPassenger = [];
    let j = 0;
    for (let index = startId; index <= endId; index++) {
      genPassenger.push({
        name: `passenger${index}`,
        location: `${location[j]}`,
      });
      j++;
      if (j % 5 === 0) j = 0;
    }
    return genPassenger;
  }
  
  function populateOutput(genPass: Array<Passenger>) {
    const remainder = genPass.length % 5;
    const boardedLength = genPass.length - remainder;
    if (boardedLength <= 50) {
      for (let index = 0; index < boardedLength; index++) boarded.push(genPass[index]);
    } else {
      for (let index = 0; index < 50; index++) boarded.push(genPass[index]);
      for (let index = 50; index < genPass.length; index++) reservation.push(genPass[index]);
    }
    if (remainder && boardedLength <= 50) {
      for (let index = boardedLength; index < genPass.length; index++)
        reservation.push(genPass[index]);
    }
  }
  if (passengers < 5) reservation = generatePassengers(startId, endId);
  else if (passengers >= 55) {
    count += 1;
    if (shuffle > 0) {
      while (shuffle > 0 && trackCount >= 55) {
        trackCount -= 50;
        shuffle -= 1;
        startId += 50;
        if (trackCount >= 5) count += 1;
      }
      const genPass = generatePassengers(startId, endId);
      populateOutput(genPass);
    } else {
      const genPass = generatePassengers(startId, endId);
      for (let index = 0; index < 50; index++) boarded.push(genPass[index]);
      for (let index = 50; index < genPass.length; index++) reservation.push(genPass[index]);
    }
  } else if (passengers < 55) {
    count = 1;
    const genPass = generatePassengers(startId, endId);
    populateOutput(genPass);
  }
  output.boarded = boarded;
  output.reservation = reservation;
  output.count = count;
  return output;
};
export default taskOne;
console.log(taskOne(53, 6));
