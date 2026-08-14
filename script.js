/* E-Waste Deconstructor - standalone browser version.
   Open index.html directly; no build step or server is required. */

const CATEGORIES = ["Recyclable", "Hazardous", "Harmful", "Non-recyclable"];
const CATEGORY_COLORS = {
  Recyclable: "#2d8067",
  Hazardous: "#d9574d",
  Harmful: "#e8ae49",
  "Non-recyclable": "#74aab0",
};

const rawItems = [
  ["mobile-phone", "Mobile phone", "The pocket-sized computer", [67, 3, 18, 12], ["Aluminium frame, copper, glass, gold traces", "Lithium cell, lead solder traces", "Brominated flame retardants, rare-earth dust", "Mixed plastics, adhesives"], "Phones are small but mineral-dense: recover their metals before they become hazardous waste."],
  ["laptop", "Laptop", "Portable workstation", [58, 5, 22, 15], ["Aluminium, copper, steel, circuit boards", "Lithium battery, mercury traces", "Flame retardants, lead solder", "Laminated composites, mixed plastics"], "A laptop can be refurbished many times before its material story is finished."],
  ["tablet", "Tablet", "A thin touch screen", [61, 4, 20, 15], ["Glass, aluminium, copper, silicon", "Lithium battery, solder", "Rare-earth phosphors, flame retardants", "Laminated display films"], "The glued-together layers make specialist recycling important."],
  ["desktop-computer", "Desktop computer", "Modular home base", [71, 3, 14, 12], ["Steel, aluminium, copper, PCBs", "Battery, lead solder", "Flame retardants, dust", "Mixed plastics, thermal paste"], "Desktop towers are among the easier electronics to repair and sort."],
  ["monitor", "Monitor", "A screen with a long afterlife", [63, 7, 15, 15], ["Glass, steel, copper, aluminium", "Mercury in older lamps, lead solder", "Flame retardants, phosphors", "Polariser films, mixed plastics"], "Never break older displays: their lamps may contain mercury."],
  ["television", "Television", "Living-room display", [60, 8, 17, 15], ["Glass, steel, copper, aluminium", "Lead glass in older CRTs, mercury", "Flame retardants, phosphors", "Backlight films, mixed plastics"], "Televisions need a dedicated drop-off route, especially older CRT models."],
  ["printer", "Printer", "Ink, paper and mechanisms", [54, 9, 21, 16], ["Steel, aluminium, copper, paper feed", "Ink residues, toner dust", "Solvents, flame retardants", "Composite cartridges, mixed plastics"], "Cartridges and toner are not ordinary household rubbish."],
  ["scanner", "Scanner", "A precise optical reader", [57, 6, 20, 17], ["Glass, steel, copper, PCBs", "Mercury in older lamps", "Flame retardants, dust", "Mixed plastics, rubber belts"], "Reuse is often better than disassembly for working scanners."],
  ["keyboard", "Keyboard", "The familiar input surface", [48, 2, 30, 20], ["Steel plate, copper, ABS plastics", "Lead solder traces", "PVC, flame retardants", "Rubber domes, mixed plastics"], "Keyboards are plastic-heavy, but their copper and steel can be separated."],
  ["mouse", "Mouse", "Small pointing device", [44, 2, 32, 22], ["Copper, steel, ABS plastics", "Lead solder traces", "PVC cable, flame retardants", "Mixed plastics, rubber"], "A small object still has a material footprint worth mapping."],
  ["charger", "Charger", "Power adapter", [52, 4, 23, 21], ["Copper, steel, circuit boards", "Lead solder, capacitor electrolytes", "PVC insulation, flame retardants", "Epoxy potting, mixed plastics"], "Unplug old chargers; damaged cables can expose live conductors."],
  ["power-bank", "Power bank", "Portable energy reserve", [53, 8, 24, 15], ["Aluminium shell, copper, steel", "Lithium-ion cell, electrolyte", "Flame retardants, nickel compounds", "Mixed casing plastics"], "Never place a swollen power bank in a household bin."],
  ["lithium-battery", "Lithium battery", "High-density energy", [49, 16, 25, 10], ["Cobalt, nickel, copper, aluminium", "Flammable electrolyte, lithium salts", "Heavy-metal compounds", "Separators, binders, mixed packaging"], "Tape the terminals and use a battery take-back point."],
  ["alkaline-battery", "Alkaline battery", "Everyday single-use cell", [45, 11, 31, 13], ["Steel, zinc, manganese", "Potassium hydroxide electrolyte", "Manganese compounds, alkaline paste", "Paper labels, seals"], "Batteries leak over time; keep them dry and separate."],
  ["headphones", "Headphones", "Sound on the move", [46, 2, 28, 24], ["Copper, aluminium, steel", "Lead solder, battery in wireless models", "PVC, flame retardants", "Foam, fabric, mixed plastics"], "Wired headphones are simpler to recover than wireless pairs."],
  ["earbuds", "Earbuds", "Tiny wireless audio", [39, 9, 30, 22], ["Copper, aluminium, gold traces", "Lithium button cells, solder", "Rare-earth magnets, flame retardants", "Resins, silicone, mixed plastics"], "Tiny sealed batteries make earbuds difficult to recycle responsibly."],
  ["smart-watch", "Smart watch", "A wearable sensor", [48, 6, 27, 19], ["Aluminium, glass, copper", "Lithium polymer cell", "Rare-earth magnets, flame retardants", "Silicone straps, adhesives"], "Repairability is often limited by the sealed watch case."],
  ["game-console", "Game console", "A living-room playground", [65, 3, 18, 14], ["Steel, copper, aluminium, PCBs", "Battery, lead solder", "Flame retardants", "Mixed plastics, thermal compounds"], "Older consoles can find a second life through repair and resale."],
  ["router", "Router", "The quiet network box", [59, 3, 22, 16], ["Copper, steel, PCBs, aluminium", "Lead solder, capacitors", "Flame retardants", "Mixed plastics, rubber feet"], "Reset data and return network hardware through provider programmes."],
  ["modem", "Modem", "A signal translator", [58, 3, 22, 17], ["Copper, steel, PCBs", "Lead solder, capacitors", "Flame retardants", "Mixed plastics"], "A working modem is valuable equipment, not scrap."],
  ["camera", "Camera", "Light, lens and memory", [56, 5, 23, 16], ["Glass lens, aluminium, copper", "Lithium cell, lead solder", "Rare-earth coatings, flame retardants", "Optical adhesives, mixed plastics"], "Remove batteries and memory cards before handing a camera over."],
  ["calculator", "Calculator", "Low-power logic", [47, 4, 31, 18], ["Copper, steel, silicon, solar cell", "Button cell battery", "Lead solder, flame retardants", "Mixed plastics, rubber keys"], "Solar calculators still contain circuit boards and should not be littered."],
  ["remote-control", "Remote control", "The household clicker", [42, 4, 32, 22], ["Copper, steel, circuit board", "Alkaline cells, lead solder", "Flame retardants, PVC", "ABS plastics, rubber keys"], "Take the cells out first; the rest can join small electronics collection."],
  ["usb-drive", "USB drive", "Memory in miniature", [54, 2, 26, 18], ["Copper, aluminium, silicon, gold traces", "Lead solder", "Flame retardants", "Epoxy, mixed plastics"], "Destroy sensitive data before donating or recycling storage media."],
  ["hard-drive", "Hard drive", "Magnetic memory", [62, 3, 19, 16], ["Steel, aluminium, copper, rare earths", "Lead solder, lubricant", "Neodymium magnets, flame retardants", "Epoxy, platters, mixed plastics"], "Hard drives contain high-value magnets and private data."],
  ["ssd", "SSD", "Flash memory storage", [59, 2, 23, 16], ["Copper, aluminium, silicon, gold", "Lead solder", "Flame retardants", "Epoxy, mixed plastics"], "SSDs have no moving parts but still deserve secure data handling."],
  ["pcb", "PCB", "The electronic skeleton", [72, 5, 16, 7], ["Copper, tin, gold, silver", "Lead solder, beryllium traces", "Brominated flame retardants", "Fibreglass epoxy"], "Circuit boards are urban mines: precious metals make careful recovery worthwhile."],
  ["wires", "Wires", "Signals and current", [83, 2, 10, 5], ["Copper, aluminium, steel", "Lead solder, PVC stabilisers", "PVC insulation, phthalates", "Rubber, mixed sheathing"], "Keep cables dry and untangled so copper can be recovered cleanly."],
  ["led-bulb", "LED bulb", "Efficient light source", [55, 6, 25, 14], ["Aluminium heat sink, glass, copper", "Lead solder, small capacitor", "Phosphors, flame retardants", "Silicone, mixed plastics"], "LEDs use less energy, but still contain recoverable electronics."],
  ["fluorescent-tube", "Fluorescent tube", "Gas-discharge lighting", [64, 18, 11, 7], ["Glass, aluminium, phosphor powder", "Mercury vapour", "Phosphors, mercury residues", "End caps, mixed plastics"], "Handle tubes gently; mercury makes them hazardous waste."],
  ["refrigerator", "Refrigerator", "Cold storage at home", [74, 9, 10, 7], ["Steel, copper, aluminium, glass", "Refrigerant gases, compressor oil", "CFCs/HFCs, flame retardants", "Foam insulation, mixed plastics"], "Certified technicians must recover refrigerants before recycling."],
  ["microwave", "Microwave", "Fast kitchen heat", [69, 7, 16, 8], ["Steel, copper, aluminium, glass", "Capacitor charge, lead solder", "Beryllium oxide in some parts, oils", "Mica sheet, mixed plastics"], "Microwave capacitors can hold a dangerous charge after unplugging."],
  ["air-conditioner", "Air conditioner", "A room-scale system", [77, 8, 9, 6], ["Copper tubing, aluminium, steel", "Refrigerant gas, compressor oil", "HFCs, flame retardants", "Foam insulation, mixed plastics"], "Recovery of refrigerant is the first responsible step."],
  ["washing-machine", "Washing machine", "A durable appliance", [82, 4, 8, 6], ["Steel, aluminium, copper, concrete", "Motor capacitors, oils", "Flame retardants, detergent residue", "Rubber seals, mixed plastics"], "Large appliances are material-rich and worth collecting separately."],
  ["solar-panel", "Solar panel", "Sunlight to electricity", [86, 3, 7, 4], ["Glass, aluminium, silicon, copper", "Lead solder, silver paste", "Cadmium in some thin-film panels", "Encapsulant films, backsheet"], "Panels have a long service life, then become a valuable clean-tech stream."],
  ["smart-speaker", "Smart speaker", "Voice-controlled home assistant", [58, 4, 23, 15], ["Aluminium, copper, steel, PCBs", "Lithium battery, lead solder", "Flame retardants, rare-earth materials", "Mixed plastics, adhesives"], "Smart speakers contain recoverable electronics, plastics and metals that should be separated properly."],
  ["robotic-vacuum", "Robotic vacuum", "Autonomous floor cleaner", [62, 5, 20, 13], ["Steel, aluminium, copper, PCBs", "Lithium-ion battery, solder", "Flame retardants, dust", "Brushes, rubber, mixed plastics"], "Batteries and electronic components make robotic vacuums unsuitable for regular household waste."],
  ["air-purifier", "Air purifier", "Indoor air cleaning device", [64, 4, 18, 14], ["Steel, aluminium, copper, motor parts", "Circuit-board components, solder", "Filter contaminants, flame retardants", "HEPA filters, foam, mixed plastics"], "Filters should be handled separately while the electronic housing can enter an e-waste stream."],
  ["digital-projector", "Digital projector", "Large-screen projection device", [60, 6, 21, 13], ["Glass lens, aluminium, copper, PCBs", "Lamp components, lead solder", "Flame retardants, phosphor materials", "Optical films, mixed plastics"], "Older projectors may contain hazardous lamp materials and need specialist recycling."],
  ["smart-thermostat", "Smart thermostat", "Connected temperature controller", [55, 4, 25, 16], ["Copper, aluminium, PCBs, glass", "Battery, solder", "Flame retardants, electronic components", "ABS plastics, adhesives"], "Smart thermostats combine sensors, batteries and circuit boards in a small package."],
  ["video-doorbell", "Video doorbell", "Connected entry camera", [52, 5, 27, 16], ["Copper, aluminium, glass, PCBs", "Lithium battery, solder", "Flame retardants, rare-earth components", "Weatherproof plastics, adhesives"], "Small connected devices still contain batteries and valuable electronic materials."],
  ["dehumidifier", "Dehumidifier", "Moisture-control appliance", [72, 7, 13, 8], ["Steel, copper, aluminium, motor parts", "Refrigerant, compressor oil", "Flame retardants, refrigerant residues", "Foam insulation, mixed plastics"], "Refrigerants should be professionally recovered before the appliance is recycled."],
  ["water-purifier", "Water purifier", "Household water treatment system", [61, 5, 19, 15], ["Steel, aluminium, copper, electronics", "UV lamp components, solder", "Filter residues, flame retardants", "Filter cartridges, tubing, mixed plastics"], "Electronic and filter components require different disposal routes."],
  ["electric-geyser", "Electric geyser", "Electric water heater", [78, 5, 10, 7], ["Steel, copper, aluminium, heating elements", "Thermostat components, solder", "Insulation chemicals, flame retardants", "Foam insulation, plastic fittings"], "Large metal components make electric geysers valuable for material recovery."],
  ["induction-cooktop", "Induction cooktop", "Electromagnetic cooking surface", [67, 5, 18, 10], ["Steel, copper, aluminium, glass", "Capacitors, solder", "Flame retardants, electronic residues", "Ceramic surface, mixed plastics"], "Induction cooktops contain copper coils and electronic control boards."],
  ["air-fryer", "Air fryer", "Compact electric cooker", [70, 3, 16, 11], ["Steel, aluminium, copper", "Circuit-board components, solder", "Non-stick coating residues, flame retardants", "Plastic housing, silicone parts"], "Separate the electronic components and metal housing through an appropriate collection route."],
  ["electric-kettle", "Electric kettle", "Fast electric water heater", [73, 2, 15, 10], ["Steel, aluminium, copper, heating element", "Thermostat, solder", "Plastic additives, electrical residues", "Handle plastics, silicone seals"], "Metal-rich kettles can provide useful recyclable material when collected properly."],
  ["food-processor", "Food processor", "Powered kitchen preparation device", [65, 3, 20, 12], ["Steel blades, copper motor, aluminium", "Circuit-board components, solder", "Motor residues, flame retardants", "Plastic bowls, rubber seals"], "Motors and metals can be recovered while mixed plastics need separate processing."],
  ["toaster-oven", "Toaster oven", "Compact electric oven", [75, 3, 13, 9], ["Steel, aluminium, copper, heating elements", "Thermostat, solder", "Electrical insulation, flame retardants", "Glass, plastic handles, insulation"], "The metal frame and heating elements make toaster ovens useful material-recovery streams."],
  ["coffee-maker", "Coffee maker", "Electric beverage brewer", [63, 4, 21, 12], ["Steel, aluminium, copper, heating elements", "Circuit boards, solder", "Scale residues, flame retardants", "Plastic reservoirs, rubber seals"], "Coffee makers combine recyclable metals with mixed plastics and electronic parts."],
  ["dishwasher", "Dishwasher", "Automated dish-cleaning appliance", [80, 4, 9, 7], ["Steel, aluminium, copper, motor parts", "Capacitors, solder, electrical components", "Flame retardants, detergent residues", "Rubber seals, plastic panels"], "Large appliances contain significant quantities of recoverable metals."],
  ["soundbar", "Soundbar", "Compact home audio system", [57, 3, 25, 15], ["Copper, aluminium, steel, PCBs", "Battery, solder, capacitors", "Flame retardants, electronic components", "Speaker surrounds, mixed plastics"], "Speakers contain magnets, copper and electronics that can be recovered."],
  ["audio-amplifier", "Audio amplifier", "Powered audio control unit", [68, 3, 19, 10], ["Aluminium, copper, steel, PCBs", "Capacitors, solder", "Flame retardants, electronic components", "Plastic knobs, insulation"], "Amplifiers are metal-rich electronics with valuable circuit-board components."],
  ["microphone", "Microphone", "Audio capture device", [50, 2, 30, 18], ["Copper, aluminium, steel, magnets", "Solder, electronic components", "Flame retardants, coatings", "Rubber, foam, mixed plastics"], "Microphones contain small amounts of valuable metals and electronic components."],
  ["gramophone-turntable", "Gramophone turntable", "Record-playing audio device", [65, 3, 20, 12], ["Steel, aluminium, copper, motor parts", "Capacitors, solder", "Electronic components, coatings", "Rubber belts, plastic housing"], "Older audio equipment can often be repaired or refurbished before recycling."],
  ["av-receiver", "AV receiver", "Home audio-video controller", [69, 4, 18, 9], ["Aluminium, copper, steel, PCBs", "Capacitors, solder", "Flame retardants, electronic components", "Plastic panels, insulation"], "AV receivers contain dense circuit boards and recoverable metals."],
  ["karaoke-machine", "Karaoke machine", "All-in-one entertainment system", [60, 3, 24, 13], ["Steel, copper, aluminium, PCBs", "Battery, solder, capacitors", "Flame retardants, electronic components", "Speaker materials, mixed plastics"], "Reuse and repair can extend the life of karaoke equipment before recycling."],
  ["electric-toothbrush", "Electric toothbrush", "Rechargeable personal-care device", [45, 8, 27, 20], ["Copper, steel, aluminium, circuit boards", "Lithium battery, charging components", "Flame retardants, electronic residues", "Brush heads, rubber, mixed plastics"], "Built-in batteries make electric toothbrushes unsuitable for regular household bins."],
  ["hair-dryer", "Hair dryer", "Powered personal-care appliance", [58, 3, 25, 14], ["Copper motor, steel, aluminium", "Thermal components, solder", "Flame retardants, electrical insulation", "Plastic housing, rubber cable"], "Motors and copper wiring can be recovered through proper e-waste collection."],
  ["beard-trimmer", "Beard trimmer", "Rechargeable grooming device", [47, 7, 28, 18], ["Steel blades, copper, aluminium", "Lithium battery, solder", "Flame retardants, electronic components", "Plastic housing, rubber seals"], "Rechargeable trimmers contain small batteries that need appropriate collection."],
  ["straightening-iron", "Straightening iron", "Electric hair styling device", [59, 3, 24, 14], ["Aluminium plates, copper wiring, steel", "Thermostat, solder", "Electrical insulation, flame retardants", "Plastic housing, silicone cable"], "Heating elements and electrical components should be separated from mixed plastics."],
  ["epilator", "Epilator", "Powered personal-care device", [48, 6, 27, 19], ["Steel, copper, aluminium, motor parts", "Rechargeable battery, solder", "Flame retardants, electronic components", "Plastic housing, rubber parts"], "Small rechargeable devices still contain batteries and recoverable electronic materials."],
  ["ups", "Uninterruptible Power Supply (UPS)", "Backup power system", [67, 15, 12, 6], ["Steel, copper, aluminium, circuit boards", "Lead-acid battery, electrolyte", "Flame retardants, electronic components", "Plastic casing, insulation"], "UPS batteries require dedicated collection because they contain hazardous materials."],
  ["paper-shredder", "Paper shredder", "Powered document shredder", [64, 4, 20, 12], ["Steel, copper, aluminium, motor parts", "Circuit-board components, solder", "Motor oils, flame retardants", "Plastic housing, rubber gears"], "The motor and metal frame make shredders useful for material recovery."],
  ["smoke-detector", "Smoke detector", "Fire-safety sensing device", [45, 8, 29, 18], ["Copper, aluminium, steel, PCBs", "Battery, solder", "Sensor materials, electronic residues", "Plastic casing"], "Smoke detectors contain batteries and electronic sensors that need proper disposal."],
  ["barcode-scanner", "Barcode scanner", "Optical identification device", [55, 3, 27, 15], ["Glass, copper, aluminium, PCBs", "Battery, solder", "Flame retardants, optical components", "ABS plastics, rubber"], "Barcode scanners contain optical components and circuit boards worth recovering."],
  ["digital-weighing-scale", "Digital weighing scale", "Electronic measurement device", [49, 4, 29, 18], ["Steel, aluminium, copper, sensors", "Button cells, solder", "Electronic components, flame retardants", "Plastic casing, rubber feet"], "Remove batteries before sending electronic weighing scales for recycling."],
  ["biometric-attendance-machine", "Biometric attendance machine", "Electronic identity and attendance system", [56, 4, 26, 14], ["Copper, aluminium, steel, PCBs", "Battery, solder", "Electronic sensors, flame retardants", "Plastic housing, display layers"], "Biometric machines contain circuit boards, sensors and display components."],
  ["electric-laminator", "Electric laminator", "Powered document laminating machine", [63, 3, 22, 12], ["Steel, aluminium, copper, heating elements", "Thermostat, solder", "Electrical insulation, flame retardants", "Plastic casing, rollers"], "Laminators contain heating elements, motors and recyclable metal components."],
  ["voltage-stabilizer", "Voltage stabilizer", "Electrical voltage protection device", [72, 5, 15, 8], ["Copper coils, steel, aluminium, PCBs", "Capacitors, solder", "Flame retardants, electronic components", "Plastic casing, insulation"], "Stabilizers contain copper-rich coils and electronic components that can be recovered."],
  ["blood-pressure-monitor", "Blood pressure monitor", "Electronic blood pressure measurement device", [52, 5, 27, 16], ["Copper, aluminium, steel, PCBs", "Battery, solder", "Electronic sensors, flame retardants", "Rubber cuff, mixed plastics"], "Blood pressure monitors contain sensors, circuit boards and batteries that should be separated during recycling."],
  ["pulse-oximeter", "Pulse oximeter", "Small blood oxygen monitor", [48, 5, 29, 18], ["Copper, aluminium, PCBs, sensors", "Button cells, solder", "Electronic components, flame retardants", "Plastic casing, silicone"], "Small medical electronics still contain batteries and recoverable electronic materials."],
  ["digital-thermometer", "Digital thermometer", "Electronic temperature measuring device", [45, 6, 30, 19], ["Copper, steel, sensors, PCBs", "Button cell battery, solder", "Electronic components", "Plastic casing, display materials"], "Remove the battery before sending an electronic thermometer for proper recycling."],
  ["glucometer", "Glucometer", "Blood glucose measurement device", [49, 6, 28, 17], ["Copper, aluminium, PCBs, sensors", "Button cell battery, solder", "Electronic components", "Plastic casing, test-strip materials"], "Glucometers contain batteries and electronic sensors that require appropriate disposal."],
  ["nebuliser", "Nebuliser", "Powered respiratory-care device", [57, 5, 24, 14], ["Steel, copper, aluminium, motor parts", "Battery or power components, solder", "Electronic components, flame retardants", "Plastic tubing, masks, mixed plastics"], "Electronic respiratory equipment should be collected separately from ordinary household waste."],
  ["hearing-aid", "Hearing aid", "Tiny wearable audio device", [43, 8, 30, 19], ["Copper, aluminium, gold traces, PCBs", "Button cell battery, solder", "Electronic components, rare-earth materials", "Plastic casing, silicone"], "Hearing aids contain tiny batteries and valuable electronic components."],
  ["cpap-machine", "CPAP machine", "Powered breathing-support device", [61, 5, 21, 13], ["Steel, aluminium, copper, PCBs", "Battery or power components, solder", "Electronic components, flame retardants", "Plastic tubing, masks, mixed plastics"], "CPAP machines contain electronics and accessories that should be separated before disposal."],
  ["dash-camera", "Dash camera", "Vehicle-mounted video recorder", [53, 5, 27, 15], ["Copper, aluminium, glass, PCBs", "Lithium battery, solder", "Flame retardants, electronic components", "Plastic housing, adhesives"], "Dash cameras contain small batteries and circuit boards that can be recovered."],
  ["gps-navigation-system", "GPS navigation system", "Satellite navigation device", [55, 4, 26, 15], ["Copper, aluminium, glass, PCBs", "Lithium battery, solder", "Electronic components, flame retardants", "Plastic casing, adhesives"], "Older navigation systems can be reused or recycled through electronics collection."],
  ["car-audio-head-unit", "Car audio head unit", "Vehicle entertainment and control system", [67, 4, 19, 10], ["Steel, aluminium, copper, PCBs", "Battery, capacitors, solder", "Flame retardants, electronic components", "Plastic panels, insulation"], "Vehicle electronics contain recoverable metals and circuit-board materials."],
  ["radar-detector", "Radar detector", "Electronic vehicle detection device", [51, 4, 29, 16], ["Copper, aluminium, PCBs", "Battery, solder", "Electronic components, flame retardants", "Plastic casing, rubber parts"], "Radar detectors should enter an electronics recycling stream rather than general waste."],
  ["ev-charger", "Electric vehicle (EV) charger", "Electric vehicle charging equipment", [74, 5, 14, 7], ["Copper, aluminium, steel, PCBs", "Capacitors, solder, electrical components", "Flame retardants, electronic residues", "Plastic casing, insulation"], "EV chargers contain copper-rich wiring and electronic components suitable for material recovery."],
  ["car-breathalyser", "Car breathalyser", "Electronic alcohol-testing device", [47, 5, 29, 19], ["Copper, aluminium, sensors, PCBs", "Battery, solder", "Sensor materials, electronic components", "Plastic casing, mouthpiece"], "Electronic breathalysers contain sensors, batteries and circuit boards."],
  ["baby-monitor", "Baby monitor", "Connected audio-video monitoring device", [54, 4, 27, 15], ["Copper, aluminium, glass, PCBs", "Lithium battery, solder", "Flame retardants, electronic components", "Plastic housing, cables"], "Baby monitors combine cameras, microphones, batteries and circuit boards."],
  ["digital-photo-frame", "Digital photo frame", "Electronic image display", [58, 4, 24, 14], ["Glass, aluminium, copper, PCBs", "Battery, solder", "Flame retardants, display components", "Plastic casing, adhesives"], "Displays contain glass, electronic components and mixed materials that require proper recycling."],
  ["electronic-luggage-scale", "Electronic luggage scale", "Portable digital weighing device", [46, 4, 31, 19], ["Steel, aluminium, copper, sensors", "Button cell battery, solder", "Electronic components", "Plastic casing, rubber grip"], "Remove the battery before recycling the electronic scale."],
  ["laser-distance-measurer", "Laser distance measurer", "Digital distance measurement device", [50, 4, 29, 17], ["Copper, aluminium, glass, PCBs", "Battery, solder", "Electronic sensors, laser components", "Plastic casing, rubber parts"], "Laser measuring devices contain sensors and electronic components that can be recovered."],
  ["digital-alarm-clock", "Digital alarm clock", "Electronic timekeeping device", [49, 3, 30, 18], ["Copper, steel, aluminium, PCBs", "Button cell or battery, solder", "Electronic components, flame retardants", "Plastic casing, display materials"], "Digital clocks contain small circuit boards and batteries."],
  ["mosquito-killer-bat", "Mosquito killer bat", "Rechargeable insect-control device", [48, 7, 28, 17], ["Steel mesh, copper, aluminium, PCBs", "Rechargeable battery, solder", "Electrical components, flame retardants", "Plastic handle, insulation"], "Rechargeable batteries should be removed or handled through an appropriate battery collection route."],
  ["electronic-keyboard-synthesizer", "Electronic keyboard synthesizer", "Digital musical keyboard", [65, 3, 20, 12], ["Steel, aluminium, copper, PCBs", "Battery, solder", "Electronic components, flame retardants", "Plastic keys, rubber contacts"], "Musical keyboards contain substantial amounts of reusable electronics and metals."],
  ["digital-drum-kit", "Digital drum kit", "Electronic percussion system", [63, 3, 22, 12], ["Steel, copper, aluminium, PCBs", "Battery, solder", "Electronic components, flame retardants", "Rubber pads, plastic parts"], "Electronic drum systems contain circuit boards, sensors and recyclable metals."],
  ["guitar-amplifier", "Guitar amplifier", "Powered musical instrument amplifier", [70, 3, 18, 9], ["Steel, aluminium, copper, PCBs", "Capacitors, solder", "Flame retardants, electronic components", "Speaker materials, plastic parts"], "Amplifiers contain copper, steel and electronic components that can be recovered."],
  ["effects-pedal", "Effects pedal", "Electronic guitar effects unit", [48, 3, 31, 18], ["Aluminium, copper, steel, PCBs", "Battery, solder", "Electronic components, flame retardants", "Rubber switches, plastic parts"], "Effects pedals are compact electronics with recoverable metals and circuit boards."],
  ["audio-mixer-board", "Audio mixer board", "Multi-channel audio controller", [66, 3, 21, 10], ["Aluminium, copper, steel, PCBs", "Capacitors, solder", "Flame retardants, electronic components", "Plastic knobs, insulation"], "Audio mixers contain dense circuit boards and valuable copper and aluminium."],
  ["smart-door-lock", "Smart door lock", "Connected electronic locking system", [54, 5, 26, 15], ["Steel, aluminium, copper, PCBs", "Lithium or alkaline battery, solder", "Electronic components, flame retardants", "Plastic housing, rubber seals"], "Smart locks combine mechanical metals with batteries and electronic components."],
  ["motion-sensor-light", "Motion sensor light", "Sensor-controlled lighting device", [58, 4, 25, 13], ["Aluminium, copper, steel, PCBs", "Capacitor, battery, solder", "Flame retardants, electronic components", "Plastic housing, insulation"], "Sensor lights contain electronic controls and recyclable metal components."],
  ["cctv-camera-switcher", "CCTV camera switcher", "Security video switching equipment", [61, 4, 24, 11], ["Steel, aluminium, copper, PCBs", "Capacitors, solder", "Flame retardants, electronic components", "Plastic casing, cables"], "Security equipment contains circuit boards and recoverable metals."],
  ["electronic-safe", "Electronic safe", "Digital security storage device", [69, 4, 17, 10], ["Steel, copper, aluminium, electronic components", "Battery, solder", "Electronic components, flame retardants", "Plastic keypad, insulation"], "Electronic safes combine large quantities of recyclable steel with electronic components."],
  ["walkie-talkie", "Walkie-talkie", "Portable two-way radio", [56, 6, 25, 13], ["Copper, aluminium, steel, PCBs", "Lithium or rechargeable battery, solder", "Electronic components, rare-earth materials", "Plastic casing, rubber controls"], "Walkie-talkies contain batteries, circuit boards and recoverable metals."],
  ["metal-detector", "Metal detector", "Electronic metal-sensing device", [57, 4, 26, 13], ["Copper, aluminium, steel, PCBs", "Battery, solder", "Electronic components, flame retardants", "Plastic casing, cables, rubber parts"], "Metal detectors contain coils, circuit boards and batteries that should be recycled responsibly."],
];
const items = rawItems.map(([id, name, short, values, materials, note]) => ({
  id, name, short, note,
  percentages: Object.fromEntries(CATEGORIES.map((category, index) => [category, values[index]])),
  materials: Object.fromEntries(CATEGORIES.map((category, index) => [category, materials[index]])),
}));

const links = [
  ["Government / India", "CPCB E-Waste Management", "Rules, guidance and national resources from the Central Pollution Control Board.", "https://cpcb.gov.in/e-waste/"],
  ["Government / Global", "UN Environment Programme", "A clear global view of the e-waste challenge and the circular economy.", "https://www.unep.org/"],
  ["Awareness", "Earth911 Recycling Search", "Find recycling and take-back options by material and location.", "https://search.earth911.com/"],
  ["Awareness", "Basel Convention", "Learn how international rules protect communities from hazardous waste.", "https://www.basel.int/"],
  ["Education", "E-waste Monitor", "Data and reports that turn a huge issue into something measurable.", "https://ewastemonitor.info/"],
  ["Government / India", "E-Waste Recycling Facilities", "Find information about authorised e-waste recyclers and collection facilities in India.", "https://www.justdial.com/Delhi/E-Waste-Recycling/nct-11235701"],
  ["Health / Global", "WHO – E-Waste & Health", "Learn about the health risks associated with unsafe handling and disposal of electronic waste.", "https://www.who.int/news-room/fact-sheets/detail/electronic-waste-(e-waste)"],
  ["Education / Global", "EPA Electronics Recycling", "Learn how to donate, reuse and recycle electronic devices responsibly.", "https://www.epa.gov/recycle/electronics-donation-and-recycling"],
  ["Education", "Ellen MacArthur Foundation", "Explore circular design, repair and systems thinking.", "https://www.ellenmacarthurfoundation.org/"],
];
const books = [
    ["The Story of Stuff", "A vivid guide to the hidden lives of the things we buy, use and throw away.", "Stuff", "https://amzn.in/d/0bx2aIrt"],
    ["Cradle to Cradle", "A foundational argument for designing products that last and work within a circular system.", "C2C", "https://amzn.in/d/05OYiYQ8"],
    ["Waste: A History", "How societies have imagined rubbish, cleanliness and responsibility across time.", "WASTE", "https://amzn.in/d/06OtBgaZ"],
    ["The Circular Economy Handbook", "Practical frameworks for imagining products that last, adapt and return.", "CIRC", "https://amzn.in/d/03MD9cee"],
    ["Silent Spring", "A landmark environmental text about chemicals, evidence and collective action.", "SPRING", "https://amzn.in/d/0bx2aIrt"],
    ["Drawdown", "Climate solutions explained with the scale and optimism of a field manual.", "DOWN", "https://amzn.in/d/05OYiYQ8"],
    ["E-Waste Management", "A guide to understanding electronic waste, its environmental impacts, recycling and responsible management.", "E-WASTE", "https://amzn.in/d/07CemHNh"],
    ["Electronic Waste Management", "Covers the collection, recycling, recovery and safe disposal of electronic waste.", "RECYCLING", "https://amzn.in/d/08Lp1U8d"],
    ["E-Waste: Implications, Regulations, and Management in India", "Focuses on e-waste challenges, regulations and management practices in the Indian context.", "INDIA", "https://amzn.in/d/0iwpNWOx"],
    ["Electronic Waste Management and Treatment Technology", "Explores technologies and processes used to treat, recover and recycle electronic waste.", "TECHNOLOGY", "https://amzn.in/d/05s27IkN"],
    ["The E-Waste Recycling Handbook", "A practical introduction to electronic waste recycling, material recovery and responsible disposal.", "RECYCLING", "https://www.amazon.in/s?k=e-waste+recycling+handbook"],
    ["Waste Management Practices", "Introduces responsible waste handling, recycling and disposal methods with environmental considerations.", "WASTE", "https://amzn.in/d/07g1Seye"],
];

const videos = [
  ["Recycling e-waste – Good for business and the environment", "How repair, reuse and recycling can reduce e-waste, including examples from India.", "DW Documentary", "https://www.youtube.com/results?search_query=Recycling+e-waste+%E2%80%93+Good+for+business+and+the+environment"],
  ["E-Waste Management | Simple Explanation & Why It Matters", "An introduction to e-waste, its environmental impact, recycling and responsible disposal.", "YouTube", "https://www.youtube.com/watch?v=Ttxliiz1vvs"],
  ["Safe e-Waste Management", "An Indian government awareness session about responsible disposal, authorised recyclers and the risks of unsafe processing.", "Digital India", "https://www.youtube.com/@DigitalIndiaofficial"],
  ["E-waste and Climate Change", "Expert discussion about the connection between electronic waste, climate change and sustainable management.", "DWIH New Delhi", "https://www.dwih-newdelhi.org/en/dwih-new-delhi-workshop-on-e-waste-management-videos/"],
  ["What actually happens to your recycled electronics?", "Explores what can happen to electronics after they are handed over for recycling.", "PBS NewsHour", "https://www.pbs.org/video/what-actually-happens-to-your-recycled-electronics-1470096788/"],
  ["E-waste: From Toxic to Green", "An Indian initiative showing how electronic waste can be collected and directed toward safer recycling.", "UNFCCC", "https://unfccc.int/es/node/10064"],
  ["E-Waste Tragedy", "A documentary examining the global movement of discarded electronics and the consequences of improper recycling.", "DCEFF", "https://dceff.org/film/e-waste-tragedy/"],
  ["E-Waste Videos & Resources", "A collection of educational videos covering e-waste policy, recycling, circularity and global e-waste issues.", "ITU", "https://www.itu.int/en/ITU-D/Environment/Pages/Toolbox/ITU-e-waste-videos.aspx"],
  ["The Story of Electronics", "An animated tour of the toxic design choices hiding inside our devices.", "E-WASTE", "https://www.youtube.com/watch?v=sW_7i6T_H78"],
  ["The Plastic Ocean", "A visual investigation into how convenience materials move through ecosystems.", "POLLUTION", "https://www.youtube.com/watch?v=6zrn4-FfbXw"],
  ["A Circular Economy", "See how products can be designed to circulate instead of becoming waste.", "SYSTEMS", "https://www.youtube.com/watch?v=zCRKvDyyHmI"],
  ["The E-Waste Tragedy", "A documentary about the global e-waste problem, unsafe recycling, environmental damage and human impacts.", "Documentary", "https://www.youtube.com/results?search_query=The+E-Waste+Tragedy+documentary"],
  ["Buy Now: The Shopping Conspiracy", "A documentary exploring overconsumption, short product lifecycles and the growing problem of waste.", "Netflix", "https://www.netflix.com/title/81554996"],
  ["E-Wasteland", "A short documentary exploring what happens to discarded electronics and the consequences of informal e-waste recycling.", "Documentary", "https://e-wastelandfilm.com/"],
  ["Our Planet: Fresh Water", "A quiet, cinematic reminder of what resource protection looks like.", "PLANET", "https://youtu.be/R2DU85qLfJQ?si=J3t4pOKsFmI0MG3w"],
];

const $ = (selector) => document.querySelector(selector);
const readStorage = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};
const writeStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const profile = () => readStorage("ewaste-profile", null);
let chart;

function showError(message) {
  const error = $("#entry-error");
  error.textContent = message;
  error.hidden = false;
}

function enterGuide(event) {
  event.preventDefault();
  const name = $("#visitor-name").value.trim();
  const email = $("#visitor-email").value.trim();
  if (!name) return showError("Tell us your name first.");
  if (!email.includes("@")) return showError("Please enter an email with an @ symbol.");
  const visitor = { name, email, visitedAt: new Date().toISOString() };
  const visitors = readStorage("ewaste-visitors", []);
  writeStorage("ewaste-profile", { name, email });
  writeStorage("ewaste-visitors", [visitor, ...visitors.filter((entry) => entry.email !== email)]);
  renderShell();
  location.hash = "knowledge";
}

function signOut() {
  localStorage.removeItem("ewaste-profile");
  $("#app-view").hidden = true;
  $("#entry-view").hidden = false;
  $("#entry-form").reset();
  location.hash = "";
}

function renderShell() {
  const currentProfile = profile();
  if (!currentProfile) return;
  $("#entry-view").hidden = true;
  $("#app-view").hidden = false;
  $("#sidebar-name").textContent = currentProfile.name;
  $("#sidebar-avatar").textContent = currentProfile.name.charAt(0).toUpperCase();
  renderRoute();
}

function setActiveRoute(route) {
  document.querySelectorAll("[data-route]").forEach((link) => {
    link.classList.toggle("active", link.dataset.route === route);
  });

  const labels = {
    knowledge: "KNOWLEDGE",
    deconstructor: "DECONSTRUCTOR",
    visitors: "VISITORS",
    links: "USEFUL LINKS",
    books: "BOOKS",
    movies: "WATCH"
  };

  $("#breadcrumb").innerHTML = `
    <span>E-WASTE / ${labels[route] || "KNOWLEDGE"}</span>
    <span style="margin-left:20px;color:#237c68;font-weight:700;letter-spacing:1px;">
      PM SHRI KENDRIYA VIDYALAYA ANDREWS GANJ
    </span>
  `;
}

function renderRoute() {
  const route = location.hash.replace("#", "").split("?")[0] || "knowledge";
  setActiveRoute(route);
  const content = $("#page-content");
  if (route === "deconstructor") content.innerHTML = deconstructorPage();
  else if (route === "visitors") content.innerHTML = visitorsPage();
  else if (route === "links") content.innerHTML = linksPage();
  else if (route === "books") content.innerHTML = booksPage();
  else if (route === "movies") content.innerHTML = moviesPage();
  else content.innerHTML = knowledgePage();
  bindRouteEvents(route);
}

function knowledgePage() {
  return `<div class="page">
    <div class="hero"><div class="hero-copy"><div class="eyebrow">A field note on discarded things</div><h1>The afterlife<br />of a <span>device.</span></h1><p class="lead">Every device is a small geological story: minerals pulled from the earth, energy shaped into circuits, and choices about what happens next.</p><div class="hero-actions"><a href="#deconstructor" class="button primary">Open the deconstructor <span>→</span></a><a href="#links" class="button ghost">Browse resources</a></div></div><div class="hero-art" aria-label="Abstract circular materials illustration">
  <span class="orbit-dot"></span>
  <span class="orbit-dot two"></span>

  <div class="device-card">
    <div class="device-card-inner">
      <div class="device-icon">▯</div>
      <div class="device-text">
        objects have<br />
        more than one life
      </div>
    </div>

    <div class="device-label">KEEP IT MOVING</div>
  </div>
</div></div>
    <div class="stat-strip"><div class="stat"><strong>65M t</strong><span>global e-waste generated in 2025</span></div><div class="stat"><strong>22.3%</strong><span>formally collected and recycled</span></div><div class="stat"><strong>80+</strong><span>elements found in electronics</span></div></div>
    <div class="section-heading"><div><div class="eyebrow">Why it matters</div><h2>Small objects.<br />Long shadows.</h2></div><p class="lead" style="max-width:380px;font-size:13px">The decisions around one phone or battery sit inside a much bigger loop of health, habitat and resource security.</p></div>
    <div class="impact-grid"><article class="impact-card card featured"><div class="impact-number">01 / ENVIRONMENT</div><h3>Materials should keep moving.</h3><p>When electronics are dumped or burned, valuable metals disappear while toxic substances can enter soil, water and air. Separate collection keeps both sides of that story visible.</p></article><article class="impact-card card"><div class="impact-number">02 / HEALTH</div><h3>Exposure is not evenly shared.</h3><ul><li>Lead can affect learning and development.</li><li>Mercury can harm the nervous system.</li><li>Informal burning creates dangerous smoke.</li></ul></article><article class="impact-card card"><div class="impact-number">03 / RESOURCES</div><h3>The next mine is already in our drawer.</h3><p>Copper, gold, cobalt and rare earths can be recovered. Repair, reuse and good recycling reduce pressure on new extraction.</p></article></div>
    <div class="section-heading"><div><div class="eyebrow">A better loop</div><h2>Three useful habits.</h2></div></div>
    <div class="resource-grid"><article class="resource-card card"><div class="resource-icon">✦</div><h3>Keep it useful</h3><p>Repair, donate or pass on a working device before considering material recovery.</p></article><article class="resource-card card"><div class="resource-icon">✓</div><h3>Protect the data</h3><p>Back up, sign out and securely erase storage before a device leaves your hands.</p></article><article class="resource-card card"><div class="resource-icon">↻</div><h3>Choose the route</h3><p>Use a certified collection point. Never put batteries, bulbs or screens in the regular bin.</p></article></div>
  </div>`;
}

function deconstructorPage() {
  const selected = readStorage("ewaste-selected", items[0].id);
  return `<div class="page"><div class="section-heading"><div><div class="eyebrow">Interactive material map</div><h2>Take something apart.</h2><p class="lead" style="margin-top:12px">Pick an everyday object. We’ll show you the materials, risks and recovery routes hiding under the casing.</p></div></div>
    <div class="deconstructor-layout"><section class="item-picker card"><div class="picker-title"><strong>Choose an object</strong><span>${items.length} mapped</span></div><div class="item-search"><span>⌕</span><input id="item-search" class="field" placeholder="Find an item..." /></div><div id="item-list" class="item-list"></div></section><section><div id="decon-detail"></div></section></div></div>`;
}

function renderItemList(query = "") {
  const selected = readStorage("ewaste-selected", items[0].id);
  const filtered = items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
  $("#item-list").innerHTML = filtered.length ? filtered.map((item) => `<button class="item-row ${item.id === selected ? "selected" : ""}" data-item-id="${item.id}"><span class="item-symbol">▣</span><span>${item.name}</span>${item.id === selected ? "<b style='margin-left:auto'>✓</b>" : ""}</button>`).join("") : `<div class="empty-state" style="padding:25px 5px"><p>No object matches that search.</p></div>`;
  document.querySelectorAll("[data-item-id]").forEach((button) => button.addEventListener("click", () => {
    writeStorage("ewaste-selected", button.dataset.itemId);
    renderItemList($("#item-search").value);
    renderItemDetail();
  }));
}

function renderItemDetail() {
  const selectedId = readStorage("ewaste-selected", items[0].id);
  const item = items.find((entry) => entry.id === selectedId) || items[0];
  const detail = $("#decon-detail");
  detail.innerHTML = `<div class="decon-head"><div><div class="eyebrow">${item.short}</div><h3 style="font-size:30px">${item.name}</h3><p class="lead">${item.note}</p></div><div class="item-count">SPECIMEN / ${String(items.indexOf(item) + 1).padStart(2, "0")}</div></div>
    <div class="decon-summary card"><div class="chart-wrap"><canvas id="breakdown-chart" width="220" height="220"></canvas><div class="chart-center"><strong>${item.percentages.Recyclable}%</strong><span>recoverable</span></div></div><div class="legend">${CATEGORIES.map((category) => `<div class="legend-item"><span class="legend-dot" style="background:${CATEGORY_COLORS[category]}"></span><span>${category}</span><strong>${item.percentages[category]}%</strong></div>`).join("")}</div></div>
    <div class="material-grid">${CATEGORIES.map((category) => `<article class="material-group card" style="--group:${CATEGORY_COLORS[category]}"><h4>${category}</h4><p>${item.materials[category]}</p></article>`).join("")}</div>
    <div class="breakdown-table card"><table><thead><tr><th>Stream</th><th>Share</th><th>What it tells us</th></tr></thead><tbody>${CATEGORIES.map((category) => `<tr><td><strong>${category}</strong></td><td><div class="bar-row"><div class="bar-track"><div class="bar-fill" style="width:${item.percentages[category]}%;background:${CATEGORY_COLORS[category]}"></div></div><span>${item.percentages[category]}%</span></div></td><td class="muted">${item.materials[category]}</td></tr>`).join("")}</tbody></table></div>`;
  if (chart) chart.destroy();
  chart = new Chart($("#breakdown-chart"), { type: "doughnut", data: { labels: CATEGORIES, datasets: [{ data: CATEGORIES.map((category) => item.percentages[category]), backgroundColor: CATEGORIES.map((category) => CATEGORY_COLORS[category]), borderWidth: 0, hoverOffset: 5 }] }, options: { responsive: true, cutout: "70%", plugins: { legend: { display: false }, tooltip: { callbacks: { label: (context) => ` ${context.label}: ${context.raw}%` } } } } });
}

function visitorsPage() {
  const visitors = readStorage("ewaste-visitors", []);
  return `<div class="page"><div class="eyebrow">The people who looked closer</div><h2>Visitor log.</h2><div class="visitor-toolbar"><p class="muted">${visitors.length} explorer${visitors.length === 1 ? "" : "s"} have opened the guide.</p><div class="search-wrap"><span>⌕</span><input id="visitor-search" class="field" placeholder="Search names or emails..." /></div></div><div id="visitor-table" class="visitor-table card"></div></div>`;
}

function renderVisitors(query = "") {
  const visitors = readStorage("ewaste-visitors", []);
  const filtered = visitors.filter((visitor) => `${visitor.name} ${visitor.email}`.toLowerCase().includes(query.toLowerCase()));
  $("#visitor-table").innerHTML = filtered.length ? `<table><thead><tr><th>Explorer</th><th>Email</th><th>Visited</th></tr></thead><tbody>${filtered.map((visitor) => `<tr><td><div class="visitor-person"><div class="avatar">${visitor.name.charAt(0).toUpperCase()}</div>${visitor.name}</div></td><td class="muted">${visitor.email}</td><td class="muted">${new Date(visitor.visitedAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</td></tr>`).join("")}</tbody></table>` : `<div class="empty-state"><div class="empty-icon">♙</div><h3>${visitors.length ? "No matching explorers" : "The log is quiet"}</h3><p>${visitors.length ? "Try another name or email." : "When someone enters the field guide, their visit will appear here on this device."}</p></div>`;
}

function linksPage() {
  return `<div class="page"><div class="eyebrow">Go further</div><h2>Good places to<br />keep looking.</h2><p class="lead" style="margin-top:16px">A short shelf of government guidance, research and practical tools. Each link opens in a new tab.</p><div class="link-grid">${links.map((link, index) => `<article class="link-card card" onclick="window.open('${link[3]}', '_blank')" style="cursor:pointer;"><div class="link-domain">${link[0]}</div><h3>${link[1]}</h3><p>${link[2]}</p><div class="card-bottom"><span class="muted">Resource ${String(index + 1).padStart(2, "0")}</span><a class="card-arrow" href="${link[3]}" target="_blank" rel="noreferrer" aria-label="Open ${link[1]}">↗</a></div></article>`).join("")}</div></div>`;
}

function booksPage() {
  return `<div class="page"><div class="eyebrow">A reading shelf</div><h2>Ideas that outlive<br />the bin.</h2><p class="lead" style="margin-top:16px">Books for following a material, a system or a responsibility all the way through.</p><div class="book-grid">${books.map((book, index) => `<article class="book-card card"><div class="book-type">${book[2]}</div><h3>${book[0]}</h3><p>${book[1]}</p><div class="card-bottom"><span class="muted">Shelf ${String(index + 1).padStart(2, "0")}</span><a class="button secondary" href="${book[3]}" target="_blank" rel="noreferrer">Buy now ↗</a></div></article>`).join("")}</div></div>`;
}

function moviesPage() {
  return `<div class="page">
    <div class="eyebrow">Watch, then notice</div>

    <h2>Moving pictures.<br />Moving systems.</h2>

    <p class="lead" style="margin-top:16px">
      Documentaries and explainers to watch with a notebook nearby.
    </p>

    <div class="video-grid">
      ${videos.map((video) => `
        <article class="video-card card">

          <div class="video-thumb">
            <span class="link-domain">${video[2]}</span>

            <a
              class="play-button"
              href="${video[3]}"
              target="_blank"
              rel="noreferrer"
              aria-label="Watch ${video[0]}"
            >▶</a>
          </div>

          <h3>${video[0]}</h3>

          <p>${video[1]}</p>

          <div class="card-bottom">
            <a
              href="${video[3]}"
              target="_blank"
              rel="noreferrer"
              class="button secondary"
            >
              ▶&nbsp; Watch now
            </a>

            <a
              href="${video[3]}"
              target="_blank"
              rel="noreferrer"
              class="card-arrow"
              aria-label="Open ${video[0]}"
            >›</a>
          </div>

        </article>
      `).join("")}
    </div>
  </div>`;
}

function bindRouteEvents(route) {
  if (route === "deconstructor") {
    renderItemList();
    renderItemDetail();
    $("#item-search").addEventListener("input", (event) => renderItemList(event.target.value));
  }
  if (route === "visitors") {
    renderVisitors();
    $("#visitor-search").addEventListener("input", (event) => renderVisitors(event.target.value));
  }
}

$("#entry-form").addEventListener("submit", enterGuide);
$("#sign-out").addEventListener("click", signOut);
$("#sidebar-sign-out").addEventListener("click", signOut);
$("#theme-toggle").addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem("ewaste-theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
  $("#theme-toggle").textContent = document.documentElement.classList.contains("dark") ? "☀" : "☾";
});
window.addEventListener("hashchange", renderRoute);

if (localStorage.getItem("ewaste-theme") === "dark") {
  document.documentElement.classList.add("dark");
  $("#theme-toggle").textContent = "☀";
}
if (profile()) renderShell();