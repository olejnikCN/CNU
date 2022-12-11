export default function TimeFormatter(prepTime) {
  //correct hours format
  let hoursNum = Math.floor(prepTime / 60);
  let hoursText = '';

  if (hoursNum === 1) hoursText = ' hodina';
  else if (hoursNum >= 2 && hoursNum <= 4) hoursText = ' hodiny';
  else if (hoursNum >= 5) hoursText = ' hodin';
  else hoursNum = '';

  //correct minutes format
  let minutesNum = Math.floor(prepTime % 60);
  let minutesText = '';

  if (minutesNum === 1) minutesText = ' minuta';
  else if (minutesNum >= 2 && minutesNum <= 4) minutesText = ' minuty';
  else if (minutesNum >= 5) minutesText = ' minut';
  else minutesNum = '';

  //comma or no comma
  const comma = minutesNum && hoursNum ? ', ' : '';

  return hoursNum + hoursText + comma + minutesNum + minutesText;
}
