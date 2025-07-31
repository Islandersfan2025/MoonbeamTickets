const hre = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts & variables
  const [deployer] = await ethers.getSigners()
  const NAME = "TicketMarketplace"
  const SYMBOL = "TM"

  // Deploy contract
  const TicketMarketplace = await ethers.getContractFactory("TicketMarketplace")
  const ticketMarketplace = await TicketMarketplace.deploy(NAME, SYMBOL)
  await ticketMarketplace.deployed()

  console.log(`Deployed TicketMarketplace Contract at: ${ticketMarketplace.address}\n`)

  // List 6 events
  const occasions = [
    {
      name: "Ethan McMahon",
      cost: tokens(3),
      tickets: 0,
      date: "Oct 1",
      time: "6:00PM EST",
      location: "Airdrop"
    },
    {
      name: "The Stooges",
      cost: tokens(1),
      tickets: 125,
      date: "Aug 12",
      time: "1:00PM PST",
      location: "Aidrop"
    },
    {
      name: "Alan Michelson",
      cost: tokens(0.25),
      tickets: 200,
      date: "Jun 9",
      time: "12pm EST",
      location: "Airdrop"
    },
    {
      name: "Pete Myers",
      cost: tokens(5),
      tickets: 0,
      date: "Sept 17",
      time: "12pm EST",
      location: "Livestream"
    },
    {
      name: "RocFather",
      cost: tokens(1.5),
      tickets: 125,
      date: "Jun 23",
      time: "12pm EST",
      location: "Airdrop"
    }
  ]

  for (var i = 0; i < 5; i++) {
    const transaction = await ticketMarketplace.connect(deployer).list(
      occasions[i].name,
      occasions[i].cost,
      occasions[i].tickets,
      occasions[i].date,
      occasions[i].time,
      occasions[i].location,
    )

    await transaction.wait()

    console.log(`Listed Event ${i + 1}: ${occasions[i].name}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
