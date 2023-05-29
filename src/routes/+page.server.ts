type Entry = {
  date: string;
  type: 'Programming' | 'Brazilian Jiu Jitsu' | 'Golf' | 'Flying';
  content: string;
};

export const load = () => {
  const entries: Entry[] = [
    {
      date: '2023-05-28',
      type: 'Flying',
      content:
        'Learning about climbing and descending. Remember the pull the carb out when below 1300 RPMs!'
    },
    {
      date: '2023-05-28',
      type: 'Golf',
      content:
        'Making good contact. Focus on reducing the wrist action. Practice but make sure you hit the ground.'
    },
    {
      date: '2023-05-28',
      type: 'Brazilian Jiu Jitsu',
      content:
        "Fun roll. Maintain a good base. Do not stay on back. Try and antipate opponent's move and don't stop moving."
    },
    {
      date: '2023-05-29',
      type: 'Brazilian Jiu Jitsu',
      content: 'Learnt about deep half guard from mount and half guard.'
    },
    {
      date: '2023-05-29',
      type: 'Programming',
      content:
        'The Alignment Problem: Reinforcement learning - incentivise for A but end up getting B. Deep Learning with Python: Gradient descent, backpropagation, overview. Rust: tui-rs'
    }
  ];
  return {
    entries
  };
};
