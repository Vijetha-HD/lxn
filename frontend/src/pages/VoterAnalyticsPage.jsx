import React, { useState,useEffect } from 'react';
import PageTitle from '../components/PageTitle';
import Card from '../components/Card';
import mockData from '../data/mockData';
// --- NEW CONTENT PAGES ---

const VoterAnalyticsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedConstituency, setSelectedConstituency] = useState('All Constituencies');
    const [selectedSegment, setSelectedSegment] = useState('All Segments');
    const [filteredVoters, setFilteredVoters] = useState(mockData.voterList);

     useEffect(() => {
        handleFilter(); // Initial filter
    }, []);

     const handleFilter = () => {
        let filtered = mockData.voterList;

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(voter =>
                voter.name.toLowerCase().includes(term) || voter.id.toLowerCase().includes(term)
            );
        }

        if (selectedConstituency !== 'All Constituencies') {
            filtered = filtered.filter(voter => voter.constituency === selectedConstituency);
        }

        if (selectedSegment !== 'All Segments') {
            filtered = filtered.filter(voter => voter.segment === selectedSegment);
        }

        setFilteredVoters(filtered);
    };

    return (
        <div>
            <PageTitle title="Voter Analytics & Segmentation" subtitle="Explore, filter, and segment voter data." />
            <Card className="mb-6 p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input type="text" placeholder="Search by Name or ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-borderLight dark:border-borderDark rounded-lg" />
                    <select className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-borderLight dark:border-borderDark rounded-lg"  value={selectedConstituency}
                        onChange={(e) => setSelectedConstituency(e.target.value)}><option>All Constituencies</option><option>Bangalore South</option><option>Mumbai North</option></select>
                    <select  value={selectedSegment}
                        onChange={(e) => setSelectedSegment(e.target.value)} className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-borderLight dark:border-borderDark rounded-lg"><option>All Segments</option><option>First-time Voter</option><option>Urban Swing Voter</option></select>
                    <button  onClick={handleFilter} className="bg-primaryAccent text-black hover:text-gray-500 font-bold py-2 px-4 rounded-lg">Filter</button>
                </div>
            </Card>
            <Card>
                 {filteredVoters.length > 0 ? ( <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b border-borderLight dark:border-borderDark">
                            <tr>
                                <th className="p-4">Voter ID</th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Age</th>
                                <th className="p-4">Constituency</th>
                                <th className="p-4">AI Segment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVoters.map(voter => (
                                <tr key={voter.id} className="border-b border-borderLight dark:border-borderDark">
                                    <td className="p-4 font-mono text-sm">{voter.id}</td>
                                    <td className="p-4 font-semibold">{voter.name}</td>
                                    <td className="p-4">{voter.age}</td>
                                    <td className="p-4">{voter.constituency}</td>
                                    <td className="p-4"><span className="px-2 py-1 text-xs rounded-full bg-primaryAccent bg-opacity-20 text-primaryAccent">{voter.segment}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                ) : (
                     <p className="p-4 text-center text-textMuted">No voters match your filter criteria.</p>
                )}
            </Card>
        </div>
    );
};

export default VoterAnalyticsPage;