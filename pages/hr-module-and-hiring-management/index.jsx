import React, { useState, useEffect } from 'react';
import { SidebarProvider } from '../../components/ui/Sidebar';
import Sidebar from '../../components/ui/Sidebar';
import MobileMenuButton from '../../components/ui/MobileMenuButton';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import CandidateCard from './components/CandidateCard';
import PipelineStage from './components/PipelineStage';
import CandidateDetails from './components/CandidateDetails';
import FilterPanel from './components/FilterPanel';
import BulkActionsBar from './components/BulkActionsBar';
import HiringAnalytics from './components/HiringAnalytics';

const HRModuleAndHiringManagement = () => {
  const [selectedStage, setSelectedStage] = useState('all');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    position: 'all',
    experience: 'all',
    availability: 'all',
    score: 'all',
    dateFrom: '',
    dateTo: ''
  });

  const mockCandidates = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10742e8ef-1763296701959.png",
      avatarAlt: 'Professional headshot of Indian man with short black hair wearing navy blue formal shirt',
      position: 'Senior Developer',
      email: 'rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      experience: '5 Years',
      appliedDate: '15/11/2025',
      stage: 'interview',
      aiScore: 88,
      skillMatch: 92,
      experienceLevel: 85,
      culturalFit: 87,
      availability: 'interview-scheduled',
      interviewDate: '02/12/2025 10:00 AM',
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS'],
      aiSummary: `Rajesh is an experienced full-stack developer with strong skills in modern web technologies. He has built several large-scale enterprise applications and has team leadership experience. His technical capability and problem-solving skills are excellent.`,
      workHistory: [
        {
          position: 'Senior Developer',
          company: 'Tech Solutions Private Limited',
          duration: '2022 - Present'
        },
        {
          position: 'Full Stack Developer',
          company: 'Digital Innovations',
          duration: '2020 - 2022'
        }
      ],
      education: [
        {
          degree: 'B.Tech Computer Science',
          institution: 'IIT Delhi',
          year: '2020'
        }
      ],
      interviewNotes: [
        {
          date: '20/11/2025',
          interviewer: 'Amit Sharma',
          note: 'Technical skills are very good. Strong in system design. Will fit well in the team.'
        }
      ],
      resumeUrl: '#'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_194356535-1763293804160.png",
      avatarAlt: 'Professional headshot of Indian woman with long black hair wearing white formal blazer',
      position: 'Project Manager',
      email: 'priya.sharma@email.com',
      phone: '+91 98765 43211',
      experience: '7 Years',
      appliedDate: '18/11/2025',
      stage: 'screening',
      aiScore: 92,
      skillMatch: 95,
      experienceLevel: 90,
      culturalFit: 91,
      availability: 'available',
      interviewDate: null,
      skills: ['Agile', 'Scrum', 'JIRA', 'Team Management', 'Stakeholder Management'],
      aiSummary: `Priya is an experienced project manager with extensive experience managing large teams. She has delivered several successful projects and has expertise in Agile methodology. Her leadership and communication skills are excellent.`,
      workHistory: [
        {
          position: 'Senior Project Manager',
          company: 'Global Tech Corp',
          duration: '2021 - Present'
        },
        {
          position: 'Project Manager',
          company: 'Innovate Software',
          duration: '2018 - 2021'
        }
      ],
      education: [
        {
          degree: 'MBA',
          institution: 'IIM Bangalore',
          year: '2018'
        }
      ],
      interviewNotes: [],
      resumeUrl: '#'
    },
    {
      id: 3,
      name: 'Vikram Singh',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17d986346-1763293808596.png",
      avatarAlt: 'Professional headshot of Indian man with short beard wearing grey formal suit',
      position: 'UI/UX Designer',
      email: 'vikram.singh@email.com',
      phone: '+91 98765 43212',
      experience: '4 Years',
      appliedDate: '20/11/2025',
      stage: 'new',
      aiScore: 85,
      skillMatch: 88,
      experienceLevel: 82,
      culturalFit: 85,
      availability: 'available',
      interviewDate: null,
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems'],
      aiSummary: `Vikram is a creative UI/UX designer with good experience in creating user-centric designs. He has designed intuitive interfaces for several mobile and web applications. His design thinking and problem-solving skills are strong.`,
      workHistory: [
        {
          position: 'Senior UI/UX Designer',
          company: 'Creative Studio',
          duration: '2022 - Present'
        },
        {
          position: 'UI Designer',
          company: 'Design Hub',
          duration: '2020 - 2022'
        }
      ],
      education: [
        {
          degree: 'B.Des Graphic Design',
          institution: 'NID Ahmedabad',
          year: '2020'
        }
      ],
      interviewNotes: [],
      resumeUrl: '#'
    },
    {
      id: 4,
      name: 'Anita Patel',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_159c3e52f-1763295839833.png",
      avatarAlt: 'Professional headshot of Indian woman with shoulder-length black hair wearing blue formal dress',
      position: 'Business Analyst',
      email: 'anita.patel@email.com',
      phone: '+91 98765 43213',
      experience: '6 Years',
      appliedDate: '22/11/2025',
      stage: 'offer',
      aiScore: 90,
      skillMatch: 93,
      experienceLevel: 88,
      culturalFit: 89,
      availability: 'not-available',
      interviewDate: null,
      skills: ['SQL', 'Data Analysis', 'Business Intelligence', 'Requirements Gathering', 'Tableau'],
      aiSummary: `Anita is a skilled business analyst with deep expertise in data analysis and business intelligence. She has solved several complex business problems and is excellent at stakeholder management.`,
      workHistory: [
        {
          position: 'Senior Business Analyst',
          company: 'Analytics Pro',
          duration: '2021 - Present'
        },
        {
          position: 'Business Analyst',
          company: 'Data Insights',
          duration: '2019 - 2021'
        }
      ],
      education: [
        {
          degree: 'MBA Finance',
          institution: 'XLRI Jamshedpur',
          year: '2019'
        }
      ],
      interviewNotes: [
        {
          date: '25/11/2025',
          interviewer: 'Sanjay Gupta',
          note: 'Very impressive candidate. Analytical skills and business understanding are excellent. Recommend for offer.'
        }
      ],
      resumeUrl: '#'
    },
    {
      id: 5,
      name: 'Arjun Mehta',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1923d9d56-1763293093495.png",
      avatarAlt: 'Professional headshot of Indian man with glasses wearing black formal shirt',
      position: 'QA Engineer',
      email: 'arjun.mehta@email.com',
      phone: '+91 98765 43214',
      experience: '3 Years',
      appliedDate: '24/11/2025',
      stage: 'screening',
      aiScore: 78,
      skillMatch: 80,
      experienceLevel: 75,
      culturalFit: 79,
      availability: 'available',
      interviewDate: null,
      skills: ['Selenium', 'API Testing', 'Test Automation', 'JIRA', 'Postman'],
      aiSummary: `Arjun is a detail-oriented QA engineer with good experience in both manual and automation testing. He has improved quality assurance processes in several projects.`,
      workHistory: [
        {
          position: 'QA Engineer',
          company: 'Quality Tech',
          duration: '2022 - Present'
        },
        {
          position: 'Junior QA',
          company: 'Test Solutions',
          duration: '2021 - 2022'
        }
      ],
      education: [
        {
          degree: 'B.Tech Information Technology',
          institution: 'Pune University',
          year: '2021'
        }
      ],
      interviewNotes: [],
      resumeUrl: '#'
    },
    {
      id: 6,
      name: 'Neha Verma',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1080cd3cc-1763296113306.png",
      avatarAlt: 'Professional headshot of Indian woman with curly hair wearing red formal blazer',
      position: 'Senior Developer',
      email: 'neha.verma@email.com',
      phone: '+91 98765 43215',
      experience: '6 Years',
      appliedDate: '26/11/2025',
      stage: 'interview',
      aiScore: 86,
      skillMatch: 89,
      experienceLevel: 84,
      culturalFit: 85,
      availability: 'interview-scheduled',
      interviewDate: '05/12/2025 02:00 PM',
      skills: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Kubernetes'],
      aiSummary: `Neha is a skilled backend developer with extensive experience building scalable systems. She has developed several high-traffic applications and is also experienced in DevOps practices.`,
      workHistory: [
        {
          position: 'Senior Backend Developer',
          company: 'Cloud Services',
          duration: '2021 - Present'
        },
        {
          position: 'Backend Developer',
          company: 'Web Solutions',
          duration: '2019 - 2021'
        }
      ],
      education: [
        {
          degree: 'M.Tech Computer Science',
          institution: 'BITS Pilani',
          year: '2019'
        }
      ],
      interviewNotes: [
        {
          date: '28/11/2025',
          interviewer: 'Rohit Kumar',
          note: 'Technical skills are very strong. Good understanding of system architecture. Shortlist for next round.'
        }
      ],
      resumeUrl: '#'
    }
  ];

  const pipelineData = {
    new: { count: 12, conversionRate: 75 },
    screening: { count: 8, conversionRate: 62 },
    interview: { count: 5, conversionRate: 80 },
    offer: { count: 2, conversionRate: 100 },
    rejected: { count: 15, conversionRate: null }
  };

  const analyticsData = {
    totalApplications: 42,
    activeCandidates: 27,
    interviewsScheduled: 5,
    offersSent: 2
  };

  const [filteredCandidates, setFilteredCandidates] = useState(mockCandidates);

  useEffect(() => {
    let result = mockCandidates;

    if (selectedStage !== 'all') {
      result = result?.filter((c) => c?.stage === selectedStage);
    }

    if (filters?.search) {
      result = result?.filter(
        (c) =>
        c?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        c?.email?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    if (filters?.position !== 'all') {
      result = result?.filter((c) => c?.position === filters?.position);
    }

    if (filters?.experience !== 'all') {
      result = result?.filter((c) => {
        const exp = parseInt(c?.experience);
        if (filters?.experience === '0-2') return exp <= 2;
        if (filters?.experience === '2-5') return exp > 2 && exp <= 5;
        if (filters?.experience === '5-10') return exp > 5 && exp <= 10;
        if (filters?.experience === '10+') return exp > 10;
        return true;
      });
    }

    if (filters?.availability !== 'all') {
      result = result?.filter((c) => c?.availability === filters?.availability);
    }

    if (filters?.score !== 'all') {
      result = result?.filter((c) => {
        if (filters?.score === '80-100') return c?.aiScore >= 80;
        if (filters?.score === '60-80') return c?.aiScore >= 60 && c?.aiScore < 80;
        if (filters?.score === '0-60') return c?.aiScore < 60;
        return true;
      });
    }

    setFilteredCandidates(result);
  }, [selectedStage, filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      position: 'all',
      experience: 'all',
      availability: 'all',
      score: 'all',
      dateFrom: '',
      dateTo: ''
    });
  };

  const handleSelectCandidate = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleToggleSelection = (candidateId) => {
    setSelectedCandidates((prev) =>
    prev?.includes(candidateId) ?
    prev?.filter((id) => id !== candidateId) :
    [...prev, candidateId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCandidates?.length === filteredCandidates?.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(filteredCandidates?.map((c) => c?.id));
    }
  };

  const handleStatusUpdate = (candidateId, newStage) => {
    console.log(`Updating candidate ${candidateId} to stage ${newStage}`);
  };

  const handleScheduleInterview = (candidateId, interviewData) => {
    console.log(`Scheduling interview for candidate ${candidateId}:`, interviewData);
  };

  const handleBulkAction = (action) => {
    console.log(`Applying bulk action ${action} to candidates:`, selectedCandidates);
    setSelectedCandidates([]);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background">
        <MobileMenuButton />
        <Sidebar userRole="admin" />

        <div className="main-content">
          <div className="p-4 lg:p-6 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  HR Module and Recruitment Management
                </h1>
                <p className="text-muted-foreground">
                  AI-powered candidate evaluation and recruitment workflow
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  iconName="Filter"
                  iconPosition="left"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  Filter
                </Button>
                <Button
                  variant="default"
                  iconName="UserPlus"
                  iconPosition="left"
                  onClick={() => console.log('Add new candidate')}
                >
                  New Candidate
                </Button>
              </div>
            </div>

            <HiringAnalytics analytics={analyticsData} />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1 space-y-4">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Icon name="GitBranch" size={18} />
                    Recruitment Pipeline
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedStage('all')}
                      className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                        selectedStage === 'all' ? 'border-primary bg-primary/10' : 'border-border bg-card hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">All Candidates</span>
                        <span className="text-xl font-bold text-foreground">
                          {mockCandidates?.length}
                        </span>
                      </div>
                    </button>
                    {Object.entries(pipelineData)?.map(([stage, data]) => (
                      <PipelineStage
                        key={stage}
                        stage={stage}
                        count={data?.count}
                        conversionRate={data?.conversionRate}
                        isActive={selectedStage === stage}
                        onClick={setSelectedStage}
                      />
                    ))}
                  </div>
                </div>

                {showFilters && (
                  <FilterPanel
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                  />
                )}
              </div>

              <div className="lg:col-span-2 space-y-4">
                <BulkActionsBar
                  selectedCount={selectedCandidates?.length}
                  onBulkAction={handleBulkAction}
                  onClearSelection={() => setSelectedCandidates([])}
                />

                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={
                          selectedCandidates?.length === filteredCandidates?.length &&
                          filteredCandidates?.length > 0
                        }
                        onChange={handleSelectAll}
                      />
                      <h3 className="font-semibold text-foreground">
                        Candidates ({filteredCandidates?.length})
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" iconName="Download" />
                      <Button variant="ghost" size="icon" iconName="RefreshCw" />
                    </div>
                  </div>

                  <div className="space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto">
                    {filteredCandidates?.length > 0 ? (
                      filteredCandidates?.map((candidate) => (
                        <div key={candidate?.id} className="flex items-start gap-3">
                          <Checkbox
                            checked={selectedCandidates?.includes(candidate?.id)}
                            onChange={() => handleToggleSelection(candidate?.id)}
                            className="mt-4"
                          />
                          <div className="flex-1">
                            <CandidateCard
                              candidate={candidate}
                              onSelect={handleSelectCandidate}
                              isSelected={selectedCandidate?.id === candidate?.id}
                              onStatusChange={() => console.log('Status change')}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12">
                        <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No candidates found</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                {selectedCandidate ? (
                  <div className="sticky top-6">
                    <CandidateDetails
                      candidate={selectedCandidate}
                      onClose={() => setSelectedCandidate(null)}
                      onStatusUpdate={handleStatusUpdate}
                      onScheduleInterview={handleScheduleInterview}
                    />
                  </div>
                ) : (
                  <div className="bg-card border border-border rounded-lg p-8 text-center">
                    <Icon name="UserCircle" size={64} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold text-foreground mb-2">
                      Select Candidate
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Click on any candidate to view details
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default HRModuleAndHiringManagement;