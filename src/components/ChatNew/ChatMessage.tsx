import { Message } from "@/types";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";

import PaperCard from "../Custom-UI/PaperCard";
import TextResponse from "../layout/ChatSection/ChatMessage/TextResponse";
import { Dialog, DialogContent } from "../ui/dialog";
import SwitchButton from "../ui/Switchbutton";
import ChatAssistantHeader from "./ChatMessage/ChatAssistantHeader";
import ChatTypeInfo from "./ChatMessage/ChatTypeInfo";
import { DataChart } from "./DataChat";
import DataTable from "./DataTable";
interface ChatMessageProps {
  message: Message;
}
export function ChatMessage({ message }: ChatMessageProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isUser = message.role === "user";

  return (
    <>
      <div className="mx-auto max-w-4xl h-full">
        {isUser ? (
          <div className="flex w-full items-center justify-center py-2">
            <PaperCard className="w-full border-none rounded-3xl p-3">
              <ChatTypeInfo isUser={isUser} />
              <RenderContent message={message} isAssistant={!isUser} />
            </PaperCard>
          </div>
        ) : (
          <div className="flex w-full items-center justify-center py-2">
            <PaperCard className="w-full border-none rounded-3xl p-3">
              <ChatAssistantHeader />
              <RenderContent message={message} />
            </PaperCard>
          </div>
        )}
      </div>

      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-[90vw] w-[90vw] h-[90vh] overflow-auto">
          {message.type === "chart" && <DataChart data={message.data} />}
        </DialogContent>
      </Dialog>
    </>
  );
}

const RenderContent = ({
  message,
  isAssistant = false,
}: {
  message: Message;
  isAssistant?: boolean;
}) => {
  if (message.type === "text") {
    return <TextResponse message={message} isAssistant={isAssistant} />;
  }

  if (message.type === "chart") {
    return <ChartTableResponse message={message} />;
  }
};

const ChartTableResponse = ({ message }) => {
  const [isChecked, setIsChecked] = useState(false);

  const [layoutDimensions, setLayoutDimensions] = useState({
    width: 500,
    height: 350,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setLayoutDimensions({ width: 280, height: 450 });
      } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        // Mid-screen dimensions
        setLayoutDimensions({ width: 700, height: 350 });
      } else {
        // Larger screen dimensions
        setLayoutDimensions({ width: 835, height: 400 });
      }
    };

    // Set initial dimensions
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const data = [
    {
      x: [
        "Premium Coconut Oil",
        "Extra Virgin Olive Oil",
        "Sunflower Cooking Oil",
        "Cold-Pressed Sesame Oil",
        "Organic Almond Oil",
        "Mustard Oil",
        "Blended Vegetable Oil",
        "Flaxseed Oil",
        "Peanut Oil",
        "Rice Bran Oil",
      ],
      y: [
        120000.0, 95000.0, 78000.0, 68000.0, 60000.0, 55000.0, 50000.0, 48000.0,
        42000.0, 38000.0,
      ],
      type: "bar",
      text: [
        120000, 95000, 78000, 68000, 60000, 55000, 50000, 48000, 42000, 38000,
      ],
      textposition: "auto",
      marker: {
        color: [
          "#4CAF50",
          "#2196F3",
          "#FFC107",
          "#9C27B0",
          "#FF5722",
          "#607D8B",
          "#FFEB3B",
          "#3F51B5",
          "#009688",
          "#795548",
        ],
      },
    },
  ];

  const layout = {
    title: {
      text: "Top Selling Oils",
      font: {
        size: 18,
      },
    },
    xaxis: {
      title: "Oil Types",
      tickangle: -45,
      automargin: true,
    },
    yaxis: {
      title: "Sales Volume",
    },
    margin: {
      b: 100,
    },
    height: layoutDimensions.height,
    width: layoutDimensions.width,
  };
  return (
    <motion.div
      initial={{ opacity: 0, transform: "scale(0.95)" }}
      animate={{ opacity: 1, transform: "scale(1)" }}
      transition={{ duration: 0.5 }}
      className="relative px-4"
    >
      <div
        className={`flex flex-col lg:w-[835px] lg:h-[500px] md:w-[700px] w-[300px] md:h-[480px]  max-w-full `}
      >
        <div className={`flex justify-end mb-2 `}>
          <SwitchButton isChecked={isChecked} setIsChecked={setIsChecked} />
        </div>
        <div>
          {isChecked ? (
            <>
              <Plot
                data={data}
                layout={layout}
                config={{
                  responsive: true,
                  displaylogo: false, // Remove Plotly logo
                  modeBarButtonsToRemove: [
                    "zoom2d", // Removes zoom functionality
                    "pan2d", // Removes pan functionality
                    "select2d",
                    "lasso2d",
                    "hoverClosestCartesian",
                    "hoverCompareCartesian",
                    "toggleSpikelines",
                    "autoScale2d",
                    "resetScale2d",
                  ],
                  modeBarButtonsToAdd: ["toImage"],
                }}
              />
            </>
          ) : (
            <div>
              <DataTable />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
