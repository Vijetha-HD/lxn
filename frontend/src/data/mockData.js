// --- MOCK DATA (INDIA CONTEXT) ---
const mockData = {
  kpis: {
    sentimentScore: { value: 6.8, trend: 1.2 },
    predictedTurnout: { value: '71%', trend: 1.5 },
    fundraisingProgress: { value: '₹8.5Cr / ₹15Cr', trend: 18 },
    keyIssueFocus: 'Youth Employment',
  },
  geospatial: [
    { id: 'IN-UP', name: 'Uttar Pradesh', sentiment: 6.5, support: 58, competitor: 42 },
    { id: 'IN-MH', name: 'Maharashtra', sentiment: 7.1, support: 62, competitor: 38 },
    { id: 'IN-KA', name: 'Karnataka', sentiment: 7.5, support: 65, competitor: 35 },
    { id: 'IN-WB', name: 'West Bengal', sentiment: 5.9, support: 48, competitor: 52 },
    { id: 'IN-TN', name: 'Tamil Nadu', sentiment: 6.2, support: 53, competitor: 47 },
  ],
 socialPosts: [
    { id: 1, date: "2024-08-10", platform: "Facebook", content: "Youth rally highlights", audience: "Youth", visuals: "/images/youthRally.jpg" },
    { id: 2, date: "2024-08-11", platform: "X", content: "Tax reform factsheet", audience: "General", visuals: "/images/taxReformFactSheet.webp" },
    { id: 3, date: "2024-08-12", platform: "Instagram", content: "Behind the scenes campaign", audience: "Young adults", visuals: "/images/behindTheScenesVotersCampaign.jpg" },
    { id: 4, date: "2024-08-13", platform: "Facebook", content: "Fundraising thank you", audience: "Donors", visuals: "/images/fundraisingThankYou.jpg" },
  ],
  sentimentAnalysis: {
    positive: 60,
    negative: 28,
    neutral: 12,
    topics: ['Infrastructure', 'GST Policy', 'Digital India', 'Agricultural Reforms'],
    influencers: ['@PrakashRajdev', '@NewsIndiaLive', '@VoiceOfMumbai'],
    mediaFeed: [
        { source: 'Hindustan Times', sentiment: 'positive', text: "Candidate's 'Digital India' push gets praise from tech industry leaders..." },
        { source: '@IndianPoliticsWatch', sentiment: 'negative', text: "The latest GST policy changes are causing a stir among small business owners. #GST" },
        { source: 'r/IndiaSpeaks', sentiment: 'neutral', text: "Discussion thread on the agricultural reforms shows a deeply divided opinion." },
        { source: 'The Hindu', sentiment: 'positive', text: "New infrastructure projects announced for Tier-2 cities, promising job growth." },
    ],
    keywords: {
        positive: ['development', 'jobs', 'growth', 'infrastructure', 'Digital India'],
        negative: ['inflation', 'corruption', 'unemployment', 'policy failure'],
    }
  },
  voterSegments: [
    { name: 'Urban Swing Voters', count: 450000, priority: 'High' },
    { name: 'Rural Loyal Supporters', count: 1250000, priority: 'Medium' },
    { name: 'First-time Voters', count: 850000, priority: 'High' },
    { name: 'Likely Donors', count: 250000, priority: 'Medium' },
  ],
  voterList: [
      { id: 'VOT7362', name: 'Aarav Sharma', age: 28, gender: 'Male', constituency: 'Bangalore South', segment: 'Tech Professional - Undecided' },
      { id: 'VOT9281', name: 'Priya Patel', age: 45, gender: 'Female', constituency: 'Mumbai North', segment: 'Small Business Owner - Loyalist' },
      { id: 'VOT1726', name: 'Rohan Singh', age: 19, gender: 'Male', constituency: 'Lucknow Central', segment: 'First-time Voter' },
      { id: 'VOT5219', name: 'Ananya Reddy', age: 35, gender: 'Female', constituency: 'Hyderabad', segment: 'Urban Swing Voter' },
      { id: 'VOT3382', name: 'Suresh Kumar', age: 52, gender: 'Male', constituency: 'Rural Patna', segment: 'Rural Farmer - Loyalist' },
  ],
  electionForecast: [
    { state: 'Uttar Pradesh', winProbability: 62 },
    { state: 'Maharashtra', winProbability: 68 },
    { state: 'Karnataka', winProbability: 71 },
    { state: 'West Bengal', winProbability: 55 },
    { state: 'Tamil Nadu', winProbability: 58 },
    { state: 'National Average', winProbability: 67 },
  ],
  canvassingRoutes: [
    { id: 1, area: 'Bangalore South Constituency', volunteers: 12, completion: 78 },
    { id: 2, area: 'Mumbai North Central Ward', volunteers: 15, completion: 62 },
    { id: 3, area: 'Lucknow East Area', volunteers: 10, completion: 88 },
  ],
  reports: [
      { id: 1, title: "Weekly Fundraising Summary - Aug 1st", date: "2024-08-01", type: "PDF" },
      { id: 2, title: "Constituency Deep Dive: Varanasi", date: "2024-07-28", type: "PDF" },
      { id: 3, title: "Sentiment Analysis Report - July 2024", date: "2024-07-25", type: "CSV" },
      { id: 4, title: "Voter Turnout Prediction Model v2.1", date: "2024-07-22", type: "PDF" },
  ],
  budget: {
      total: 150000000, // 15 Cr
      spent: 85000000, // 8.5 Cr
      categories: [
          { name: 'Digital Ads', spent: 30000000, total: 50000000 },
          { name: 'Rallies & Events', spent: 25000000, total: 40000000 },
          { name: 'Print & TV Ads', spent: 20000000, total: 30000000 },
          { name: 'Field Operations', spent: 10000000, total: 30000000 },
      ]
  },
  competitors: [
      { name: 'Opponent A', sentiment: 4.5, key_issue: 'Tax Reform', media_mentions: 1200 },
      { name: 'Opponent B', sentiment: 5.2, key_issue: 'Education', media_mentions: 950 },
  ],
  events: [
      { id: 1, name: 'Rally in Mumbai', date: '2024-08-10', location: 'Azad Maidan', attendees: 5000, status: 'Upcoming' },
      { id: 2, name: 'Town Hall in Bangalore', date: '2024-08-12', location: 'Town Hall', attendees: 500, status: 'Upcoming' },
      { id: 3, name: 'Press Conference in Delhi', date: '2024-08-01', location: 'Press Club of India', attendees: 50, status: 'Completed' },
  ],
  volunteers: [
      { id: 'VOL001', name: 'Ravi Kumar', area: 'Bangalore South', hours: 25, status: 'Active' },
      { id: 'VOL002', name: 'Sunita Sharma', area: 'Mumbai North', hours: 32, status: 'Active' },
      { id: 'VOL003', name: 'Amit Singh', area: 'Lucknow East', hours: 18, status: 'Inactive' },
  ],
  adCampaigns: [
      { id: 'AD001', name: 'Facebook - Youth Outreach', platform: 'Facebook', impressions: 1500000, clicks: 75000, ctr: '5.0%', spend: 250000 },
      { id: 'AD002', name: 'YouTube - Infrastructure Focus', platform: 'YouTube', impressions: 800000, clicks: 48000, ctr: '6.0%', spend: 400000 },
      { id: 'AD003', name: 'Local Newspaper - Rural Connect', platform: 'Print', impressions: 500000, clicks: null, ctr: 'N/A', spend: 300000 },
  ],
  positiveMentions: [
    "Strong support from The Times of India for youth employment policies.",
    "India Today praises fundraising transparency.",
    "Positive reception on social media after yesterday’s rally."
  ],
  negativeMentions: [
    "Criticism from The Hindu on environmental stance.",
    "Opposition questions feasibility of tax reforms."
  ],
  schedule: [
    { title: "TV Interview with India Today", details: "Discuss economic plan", time: "10:00 AM" },
    { title: "Youth Rally", details: "Main grounds, City Center", time: "2:00 PM" },
    { title: "Private Donor Meeting", details: "Fundraising dinner", time: "7:00 PM" }
  ],
   speechesAndTalkingPoints: [
    {
      category: "Economy",
      points: [
        "Boost small business loans to create jobs.",
        "Invest in green energy to reduce unemployment.",
      ],
      statistics: [
        "GDP growth at 6.2% this year.",
        "2 million new jobs created since last fiscal year.",
      ],
      rebuttals: [
        "Our policies balance economic growth with environmental responsibility.",
        "Debt reduction plan is backed by independent economists.",
      ],
    },
    {
      category: "Healthcare",
      points: [
        "Expand affordable healthcare coverage.",
        "Reduce prescription drug costs.",
      ],
      statistics: [
        "Healthcare spending reduced by 8% since reforms.",
        "Patient satisfaction rates increased by 15%.",
      ],
      rebuttals: [
        "Universal healthcare won't increase taxes for the middle class.",
        "Our plan preserves choice while lowering costs.",
      ],
    },
  ],
 
};

export default mockData;