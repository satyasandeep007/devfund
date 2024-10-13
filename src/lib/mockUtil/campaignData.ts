export const sampleCampaigns = [
  {
    owner: "johndoe",
    githubRepo: {
      id: 123456789,
      name: "eth-todo-list",
      fullName: "johndoe/eth-todo-list",
      description: "A decentralized todo list application built on Ethereum",
      url: "https://github.com/johndoe/eth-todo-list",
      stars: 45,
      forks: 12,
      language: "Solidity",
    },
    title: "Decentralized Todo List - Ethereum dApp",
    description:
      "Support the development of an open-source, decentralized todo list application. This project aims to demonstrate the power of blockchain in everyday applications.",
    category: "Blockchain",
    fundingGoal: 5000,
    currentFunding: 2750,
    donationCount: 18,
    startDate: new Date("2023-06-01"),
    endDate: new Date("2023-08-31"),
    status: "active",
    tags: ["ethereum", "dapp", "todo-list", "blockchain"],
    updates: [
      {
        date: new Date("2023-06-15"),
        content:
          "We've successfully implemented the smart contract for task creation and completion!",
      },
    ],
    contractAddress: "0x1234567890123456789012345678901234567890",
  },
  {
    owner: "janedoe",
    githubRepo: {
      id: 987654321,
      name: "open-ai-chatbot",
      fullName: "janedoe/open-ai-chatbot",
      description: "An open-source chatbot powered by OpenAI's GPT-3",
      url: "https://github.com/janedoe/open-ai-chatbot",
      stars: 132,
      forks: 28,
      language: "Python",
    },
    title: "Community-Driven AI Chatbot",
    description:
      "Help us build an open-source, customizable chatbot that leverages the power of GPT-3. Our goal is to make AI technology accessible to everyone.",
    category: "Artificial Intelligence",
    fundingGoal: 10000,
    currentFunding: 7500,
    donationCount: 42,
    startDate: new Date("2023-05-15"),
    endDate: new Date("2023-09-15"),
    status: "active",
    tags: ["ai", "chatbot", "gpt-3", "open-source"],
    updates: [
      {
        date: new Date("2023-06-01"),
        content:
          "We've released the first beta version of the chatbot. Try it out and give us your feedback!",
      },
      {
        date: new Date("2023-06-20"),
        content:
          "Thanks to your support, we've been able to upgrade our API access and improve response times significantly.",
      },
    ],
    contractAddress: "0x0987654321098765432109876543210987654321",
  },
  {
    owner: "cryptodev",
    githubRepo: {
      id: 246813579,
      name: "defi-yield-optimizer",
      fullName: "cryptodev/defi-yield-optimizer",
      description:
        "A DeFi yield optimization tool for maximizing returns across multiple protocols",
      url: "https://github.com/cryptodev/defi-yield-optimizer",
      stars: 89,
      forks: 15,
      language: "JavaScript",
    },
    title: "DeFi Yield Optimizer - Maximize Your Crypto Returns",
    description:
      "Support the development of an open-source tool that helps users optimize their yield farming strategies across various DeFi protocols.",
    category: "DeFi",
    fundingGoal: 15000,
    currentFunding: 9800,
    donationCount: 63,
    startDate: new Date("2023-04-01"),
    endDate: new Date("2023-10-01"),
    status: "active",
    tags: ["defi", "yield-farming", "crypto", "finance"],
    updates: [
      {
        date: new Date("2023-05-01"),
        content:
          "We've successfully integrated with Aave and Compound protocols!",
      },
      {
        date: new Date("2023-06-15"),
        content:
          "New feature alert: Auto-rebalancing is now live in the beta version.",
      },
    ],
    contractAddress: "0x1357924680135792468013579246801357924680",
  },
];
