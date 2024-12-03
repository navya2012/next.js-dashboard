import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Divider } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface Metrics {
  active_users?: {
    current?: number;
    total?: number;
  };
  questions_answered?: number;
  average_session_length_seconds?: number;
  starting_knowledge_percentage?: number;
  current_knowledge_percentage?: number;
}

interface Response {
  metrics?: Metrics;
  activity?: {
    monthly: { month: string; value: number }[];
  };
}

interface ActivitiesProps {
  response: Response
}

const Activities: React.FC<ActivitiesProps> = ({ response }) => {
  const calculateKnowledgeGain = (currentKnowledge: number, startingKnowledge: number): number => {
    return currentKnowledge - startingKnowledge;
  };

  return (
    <>
      <div className="flex flex-wrap justify-between align-top gap-4 py-3 ">
        <div className="flex-1  grid lg:grid-cols-3 gap-4 flex-wrap">
          <Card sx={{ minWidth: 140, borderRadius: '20px', padding: '10px 5px' }}>
            <CardContent>
              <p className="text-black text-opacity-70 font-medium text-sm">Active Users</p>
              <p className="text-2xl text-black text-opacity-100 font-bold py-7">
                {response?.metrics?.active_users?.current} /{" "}
                <span className="text-black text-opacity-50">
                  {response?.metrics?.active_users?.total}
                </span>
              </p>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 140, borderRadius: '20px', padding: '10px 5px' }}>
            <CardContent>
              <p className="text-black text-opacity-70 font-medium text-sm">Questions Answered</p>
              <p className="text-2xl text-black text-opacity-100 font-bold py-7">
                {response?.metrics?.questions_answered}
              </p>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 140, borderRadius: '20px', padding: '10px 5px' }}>
            <CardContent>
              <p className="text-black text-opacity-70 font-medium text-sm">Av. Session Length</p>
              <p className="text-2xl text-black text-opacity-100 font-bold py-7">
                {response?.metrics?.average_session_length_seconds}
              </p>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 140, borderRadius: '20px', padding: '10px 5px' }}>
            <CardContent>
              <p className="text-black text-opacity-70 font-medium text-sm">Starting Knowledge</p>
              <p className="text-2xl text-black text-opacity-100 font-bold py-7">
                {response?.metrics?.starting_knowledge_percentage}
              </p>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 140, borderRadius: '20px', padding: '10px 5px' }}>
            <CardContent>
              <p className="text-black text-opacity-70 font-medium text-sm">Current Knowledge</p>
              <p className="text-2xl text-black text-opacity-100 font-bold py-7">
                {response?.metrics?.current_knowledge_percentage}
              </p>
            </CardContent>
          </Card>
          <Card sx={{ minWidth: 140, borderRadius: '20px', padding: '10px 5px' }}>
            <CardContent>
              <p className="text-black text-opacity-70 font-medium text-sm">Knowledge Gain</p>
              <p className="text-2xl text-black text-opacity-100 font-bold py-7">
                {response?.metrics?.starting_knowledge_percentage && response?.metrics?.current_knowledge_percentage
                  ? `${calculateKnowledgeGain(
                      response?.metrics?.current_knowledge_percentage,
                      response?.metrics?.starting_knowledge_percentage
                    ) >= 0
                      ? '+'
                      : '-'}
                    ${Math.abs(calculateKnowledgeGain(
                      response?.metrics?.current_knowledge_percentage,
                      response?.metrics?.starting_knowledge_percentage
                    ))}%`
                  : " "}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1  p-4 shadow-md border-collapse  rounded-2xl bg-white">
          <div className=" border-gray-200 flex items-center justify-between py-3">
              <h2 className="text-gray-600 text-opacity-100 font-medium text-sm">Activity</h2>
              <p className="text-gray-900 text-opacity-100 font-medium text-xs">Monthly</p>
          </div>
          
          <Divider className="pb-3" />

          <ResponsiveContainer width="100%" height={330} className='pb-3'>
            <BarChart
              barSize={15}
              barGap={8}
              data={response?.activity?.monthly?.map(item => ({
                month: item.month,
                value: item.value,
              })) || []}
            >
              <XAxis dataKey="month" />
              <YAxis/>
              <Bar dataKey="value" fill="#4578F9" radius={[10, 10, 0, 0]} background={{ fill: '#F2F7FF' }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Activities;
