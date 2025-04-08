export function selectWeightedWinners(entries, count = 3) {
  const tickets = [];
  entries.forEach(entry => {
    for (let i = 0; i < entry.amount; i++) {
      tickets.push(entry);
    }
  });

  const selected = [];
  while (selected.length < count && tickets.length > 0) {
    const randIndex = Math.floor(Math.random() * tickets.length);
    const winner = tickets[randIndex];
    if (!selected.find(s => s.user_id === winner.user_id)) {
      selected.push(winner);
    }
    tickets.splice(randIndex, 1);
  }
  return selected;
}