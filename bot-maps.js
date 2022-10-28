const BOT_MAPS = {
  
  // A different brain, this one is for EMOJI
  emojiBot: {
    title: "Only speaks emoji",
    // exits: ["sdfasjd"],
    
    states: {
      origin: {
        // onTickSay: `#wait# <a href='xkcd.com'>link</a><img src="https://content.presentermedia.com/content/animsp/00022000/22814/hourglass_sand_pour_business_woman_300_wht.gif">`,
        exits: ["wait:5 ->question '#question#'"],
      },
      question: {
        onEnterSay: "❓",
        onTickSay: "#emoji# #emoji# #emoji#",
        exits: [
          "'🐨' ->animal '",
          "'🍞' ->food '",
          "'❤️' ->happy '",
          "wait:5 ->question '⁉️'",
        ],
      },

      happy: {
        onTickSay: "#heart# #emoji# #heart#",
        exits: ["wait:5 ->animal '#heart#'"],
      },
      animal: {
        onTickSay: "#animal# #animal# #animal#",
        exits: ["wait:5 ->happy '#animal#'"],
      },
    },
    grammar: {
      "emoji": ["#animal#", "#food#", "#heart#"],
      "animal": ["🐧", "🐈", "🦒", "🐕", "🐿", "🐓", "🐁"],
      "food": ["🍊", "🥞", "🥨", "🧀", "🌽", "🌶", "🍏"],
      "heart": ["💕", "💜", "💙", "💔"],
    },
  },
  
  
  myBot: {
    title: "Cocoa-and-Therapy Bot",
    description: [
      "a bot for suggesting hot drinks and listening to your problems",
    ],

    states: {
      origin: {
        onEnterSay:
          "I'm your therapeutic cocoa machine. Tell me about your problems while I make you a nice warm drink",
        exits: [
          "'drink' ->makeDrink",
          "'drink' ->makeDrink",
          "'*' ->makeDrink",
        ],
      },

      makeDrink: {
        onEnterSay: "I'll make you a #drink#.",
        exits: [
          "wait:5 ->origin 'Ah, not quite the right time, I see.' 'Something else maybe?'",
          "'something else' ->makeDrink 'How about something different then?'",
          "* ->listen '*SLURP*'",
        ],
      },

      listen0: {
        onEnterSay: "#askAboutUser#",
        exits: [
          "wait:5 ->origin 'Quiet time is good too'",
          "'*' ->origin '#sympathy#'",
        ],
      },
      listen1: {
        onEnterSay: ["#sympathy#", "#askAboutUser#"],
      },

      exits: ["'*' -> '#sympathy#'"],
    },
    grammar: {
      askAboutUser: [
        "How was your day?",
        "What's on your mind?",
        "How is this week going?",
      ],
      listen: [
        "mmhmm",
        "tell me about it",
        "tell me more?",
        "does that happen often?",
      ],
      sympathy: [
        "that sounds #difficult#",
        "you've been through a lot",
        "it sounds like you are trying very hard",
      ],
      difficult: ["challenging", "hard", "like a tough time"],
      toppings: [
        "caramel sauce",
        "mini marshmallows",
        "a candy cane",
        "sprinkles",
        "whipped cream",
        "vegan whip",
        "marshmallow fluff",
        "grated nutmeg",
      ],
      milk: ["oatmilk", "soy", "whole milk", "skim", "almond milk"],
      coffeeType: [
        "latte",
        "chai",
        "espresso",
        "frappe",
        "mocha",
        "hot chocolate",
      ],
    },
  },
};
