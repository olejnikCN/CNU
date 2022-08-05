export const TimeFormatter = (prepTime) => {
  prepTime = Number(prepTime);
  var hours = Math.floor(prepTime / 60);
  var minutes = Math.floor(prepTime % 60);

  var hoursDisplay =
    hours === 1
      ? hours + ' hodina'
      : hours >= 2 && hours <= 4
      ? hours + ' hodiny'
      : hours >= 5
      ? hours + ' hodin'
      : '';
  var comma = minutes > 0 && hours > 0 ? ', ' : '';
  var minutesDisplay =
    minutes === 1
      ? minutes + ' minuta'
      : minutes >= 2 && minutes <= 4
      ? minutes + ' minuty'
      : minutes >= 5
      ? minutes + ' minut'
      : '';

  return hoursDisplay + comma + minutesDisplay;
};
