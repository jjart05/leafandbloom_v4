export interface ServiceItem {
  id: string
  title: string
  summary: string
  detail: string
  priceFrom: string
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'florals',
    title: 'Floral arrangements',
    summary: 'Seasonal stems for tables, gifts, and quiet rooms.',
    detail:
      'Hand-tied arrangements planned around your room, occasion, and palette. We source seasonal stems and deliver ready to place.',
    priceFrom: 'From ₱1,800',
  },
  {
    id: 'weddings',
    title: 'Wedding & events',
    summary: 'Venue florals and installations from consult to event day.',
    detail:
      'Consultation, design proposal, install, and strike. Suitable for ceremonies, receptions, and intimate gatherings across Cebu.',
    priceFrom: 'Custom quote',
  },
  {
    id: 'consults',
    title: 'Plant consultations',
    summary: 'Selection and placement matched to light and care habits.',
    detail:
      'In-home or remote consult covering light levels, watering rhythm, pets, and plant shortlists that will actually thrive.',
    priceFrom: 'From ₱1,200',
  },
  {
    id: 'subscriptions',
    title: 'Plant subscriptions',
    summary: 'Monthly curated plants with simple care notes.',
    detail:
      'A recurring delivery of studio-selected plants. Swap preferences anytime. Ideal for homes and small offices.',
    priceFrom: 'From ₱1,500 / mo',
  },
  {
    id: 'delivery',
    title: 'Premium delivery',
    summary: 'Packed for transit and arranged for careful handoff.',
    detail:
      'Protective packing and scheduled delivery across participating Philippine locations. Ask for lead times when you enquire.',
    priceFrom: 'From ₱150',
  },
  {
    id: 'corporate',
    title: 'Corporate styling',
    summary: 'Office planting with install and refresh options.',
    detail:
      'Lobby, desk, and meeting-room planting plans with optional quarterly refresh and plant care guidance for staff.',
    priceFrom: 'Custom quote',
  },
]
