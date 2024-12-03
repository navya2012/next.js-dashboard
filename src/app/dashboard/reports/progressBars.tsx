import { Avatar, Box, LinearProgress } from "@mui/material";
import React from "react";

interface Topic {
    name: string;
    image: string;
    correct_percentage: number;
  }
  
  interface Topics {
    weakest: Topic[];
    strongest: Topic[];
  }
  
  interface Response {
    topics: Topics;
  }

interface ActivitiesProps {
  response: Response;  
}

const ProgressBars: React.FC<ActivitiesProps> = ({ response }) => {
  console.log(response);

  return (
    <>
      <div className="flex flex-wrap justify-between align-top gap-4 py-3">
        <div className="flex-1 p-4 shadow-md border-collapse rounded-2xl bg-white">
          <h2 className="text-black text-opacity-50 font-medium text-sm pb-3">
            Weakest Topics
          </h2>

            {response?.topics?.weakest && response?.topics?.weakest.length > 0 ? (
              response.topics.weakest.map((item, index) => (
                <div key={index} className="flex gap-4 items-center py-3">
                    <Avatar variant="rounded" src={item.image} />

                  <div className="flex-1">
                    <p className="text-black font-semibold text-sm pb-2">
                      {item.name}
                    </p>

                    <div className="flex gap-3 items-center">
                      <Box sx={{ flexGrow: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={item.correct_percentage}
                         sx={{
                          height: 10,
                          borderRadius: 4,
                          '& .MuiLinearProgress-bar': {
                            background: "linear-gradient(143.13deg, #FFBF1A 5.36%, #FF4080 94.64%)"
                            , 
                          },
                          backgroundColor: '#FFE0DF', 
                        }}
                        />
                      </Box>
                      <p>{item.correct_percentage}% Correct</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No data available for weakest topics</p>
            )}

        </div>

        <div className="flex-1 p-4 shadow-md border-collapse rounded-2xl bg-white">
          <h2 className="text-black text-opacity-50 font-medium text-sm">
            Strongest Topics
          </h2>
          {response?.topics?.strongest && response?.topics?.strongest.length > 0 ? (
              response.topics.strongest.map((item, index) => (
                <div key={index} className="flex gap-4 items-center py-3">
                    <Avatar variant="rounded" src={item.image}  sx={{ width:'51px', height:'32px'}}/>

                  <div className="flex-1">
                    <p className="text-black font-semibold text-sm pb-2">
                      {item.name}
                    </p>

                    <div className="flex gap-3 items-center">
                      <Box sx={{ flexGrow: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={item.correct_percentage}
                         sx={{
                          height: 10,
                          borderRadius: 4,
                          '& .MuiLinearProgress-bar': {
                            background: "linear-gradient(270deg, #2FEA9B 15.5%, #7FDD53 85.5%)" , 
                          },
                          backgroundColor: '#DDFBEE', 
                        }}
                        />
                      </Box>
                      <p>{item.correct_percentage}% Correct</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No data available for weakest topics</p>
            )}
        </div>
      </div>
    </>
  );
};

export default ProgressBars;
