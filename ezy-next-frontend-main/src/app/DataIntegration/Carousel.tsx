import { useState } from "react";
import { IconType } from 'react-icons';
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ProgressCard {
  id: number;
  title: string;
  type: "progress";
  value: string | number;
  percentage: number;
  color: string;
  icon?: IconType;
  iconColor?: string;
}

interface IncidentCard {
  id: number;
  title: string;
  type: "incident";
  icon: IconType;
  iconColor: string;
  date: string;
  time: string;
  ago: string;
}

type CardData = ProgressCard | IncidentCard;

interface CarouselProps {
  cardData: CardData[];
  totalUsersPieData: any;
  activeUsersPieData: any;
}

export const Carousel: React.FC<CarouselProps> = ({ cardData, totalUsersPieData, activeUsersPieData }) => {
  const reversedCardData = [...cardData].reverse();
  const [startIndex, setStartIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const cardsPerPage = 2;
  const maxIndex = Math.max(0, reversedCardData.length - cardsPerPage);

  const handlePrevious = () => {
    if (isTransitioning || startIndex === 0) return;

    setIsTransitioning(true);
    setStartIndex(prev => Math.max(0, prev - 1));

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const handleNext = () => {
    if (isTransitioning || startIndex >= maxIndex) return;

    setIsTransitioning(true);
    setStartIndex(prev => Math.min(maxIndex, prev + 1));

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const CircularProgress = ({ percentage, color }) => {
    const circleCircumference = 2 * Math.PI * 40;
    const offset = circleCircumference - (percentage / 100) * circleCircumference;

    return (
      <svg width="80" height="80" viewBox="0 0 100 100" className="relative">
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="lightgray"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circleCircumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
        <text
          x="50"
          y="55"
          textAnchor="middle"
          className="text-xl font-bold fill-gray-700 dark:fill-gray-200"
        >
          {percentage}%
        </text>
      </svg>
    );
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <p className="text-base sm:text-lg font-semibold">Workflow</p>

        <div className="flex gap-1 sm:gap-2">
          <button
            className={`p-1 sm:p-1.5 rounded-full transition-all duration-300 ${startIndex === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
              : "bg-gray-100 hover:bg-gray-200 text-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"
              }`}
            onClick={handlePrevious}
            disabled={startIndex === 0}
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className={`p-1 sm:p-1.5 rounded-full transition-all duration-300 ${window.innerWidth > 770 ? startIndex + 2 >= maxIndex

              ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
              : "bg-gray-100 hover:bg-gray-200 text-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"
              : startIndex + 0.5 >= maxIndex

                ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
                : "bg-gray-100 hover:bg-gray-200 text-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"}`}
            onClick={handleNext}
            disabled={window.innerWidth < 1024 ? startIndex + 0.5 >= maxIndex : startIndex + 2 >= maxIndex}
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out "
          style={{
            transform: `translateX(-${(startIndex * 100) / cardsPerPage}%)`,
          }}
        >
          {reversedCardData.map((card) => (
            <div
              key={card.id}
              className="min-w-[45%] sm:min-w-[50%] lg:min-w-[33.333%] xl:min-w-[25%] px-1 sm:px-2"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-2 sm:p-3 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer group h-full flex flex-col">
                {card.type === "progress" ? (
                  <div className="flex flex-col h-full relative">
                    {card.title === "Active Users" ? (
                      <>
                        <div className="flex items-center mb-1 sm:mb-2">
                          <card.icon
                            className={`${card.iconColor} text-lg sm:text-xl mr-1.5 sm:mr-3 transition-transform group-hover:rotate-12`}
                          />
                          <div className="font-bold text-xs sm:text-base text-blue-500 dark:text-blue-400 truncate">
                            {card.title}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-base sm:text-xl font-bold text-gray-900 dark:text-white">
                            {card.value}
                          </div>
                          <div className="w-24 h-24">
                            {activeUsersPieData && <Pie data={activeUsersPieData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />}
                          </div>
                        </div>
                      </>
                    ) : card.title === "Total Users" ? (
                      <>
                        <div className="flex items-center mb-1 sm:mb-2">
                          <card.icon
                            className={`${card.iconColor} text-lg sm:text-xl mr-1.5 sm:mr-3 transition-transform group-hover:rotate-12`}
                          />
                          <div className="font-bold text-xs sm:text-base text-blue-500 dark:text-blue-400 truncate">
                            {card.title}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-base sm:text-xl font-bold text-gray-900 dark:text-white">
                            {card.value}
                          </div>
                          <div className="w-24 h-24">
                            {totalUsersPieData && <Pie data={totalUsersPieData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {card.icon && (
                          <div className="flex items-center mb-1 sm:mb-2">
                            <card.icon
                              className={`${card.iconColor} text-lg sm:text-xl mr-1.5 sm:mr-3 transition-transform group-hover:rotate-12`}
                            />
                            <div className="font-bold text-xs sm:text-base text-blue-500 dark:text-blue-400 truncate">
                              {card.title}
                            </div>
                          </div>
                        )}
                        {!card.icon && (
                          <div className="font-bold text-xs sm:text-base text-blue-500 dark:text-blue-400 mb-1 sm:mb-2 truncate">
                            {card.title}
                          </div>
                        )}
                        <div className="flex flex-col sm:flex-row justify-between items-center mt-auto gap-2 sm:gap-0">
                          <div className="text-base sm:text-xl font-bold text-gray-900 dark:text-white">
                            {card.value}
                          </div>
                          <div className="scale-75 sm:scale-100">
                            <CircularProgress percentage={card.percentage} color={card.color} />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col h-full">
                    <div className="flex items-start">
                      <card.icon
                        className={`${card.iconColor} text-lg sm:text-2xl transition-transform group-hover:rotate-12 mr-1.5 sm:mr-3 flex-shrink-0`}
                      />
                      <div className="min-w-0  flex-1">
                        <div className="font-bold  text-xs sm:text-base text-blue-500 dark:text-blue-400 mb-1 sm:mb-1.5 ">
                          {card.title}
                        </div>
                        <div className="flex flex-wrap justify-between items-center">
                          <div className="text-xs sm:text-base font-bold text-gray-900 dark:text-white ">
                            {card.date}
                          </div>
                          <div className="text-xs sm:text-base font-bold ml-1.5 sm:ml-3 text-gray-900 dark:text-white">
                            {card.time}
                          </div>
                        </div>
                        <div className="text-[10px] sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1 ">
                          {card.ago}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};