// RadarChart.js
import React , {useState , useEffect} from "react";
import { Radar } from "react-chartjs-2";
import TestServer from "../../../api/test.server"
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({id}) => {
  const dashedLinePlugin = {
    id: 'dashedLinePlugin',
    beforeDraw: (chart) => {
      const { ctx, scales: { r } } = chart;
      const { grid, ticks } = r;

      // Get the positions of the ticks
      const tickPositions = r.ticks.map(tick => r.getDistanceFromCenterForValue(tick.value));

      // Draw grid lines
      tickPositions.forEach((position, index) => {
        ctx.save();
        ctx.beginPath();
        if (index === 2) { // Third line (index 2)
          ctx.setLineDash([5, 5]); // Set dashed line pattern
        } else {
          ctx.setLineDash([]); // Solid lines for other grid lines
        }
        ctx.strokeStyle = grid.color;
        ctx.lineWidth = grid.lineWidth;
        ctx.arc(r.xCenter, r.yCenter, position, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
      });
    }
  };



  const [vitesse, setVitesse] = useState()
  const [saut, setSaut] = useState()
  const [conduit, setConduit] = useState()
  const [agilite, setAgilite] = useState()
  const [jonglage, setJonglage] = useState()
  const [tir, setTir] = useState()


  const getVitesseForCurrentUser = async (id) => {
    let data = await TestServer.getVitesseStatsByUser(id);
    setVitesse(data?.points * 100 / 150)
  }
  const getSautForCurrentUser = async (id) => {
    let data = await TestServer.getSautStatsByUser(id);
    setSaut(data?.totalPoints * 100 / 100)
  }
  const getConduitForCurrentUser = async (id) => {
    let data = await TestServer.getConduitStatsByUser(id);
    setConduit(data * 100 / 100)
  }
  const getAgiliteForCurrentUser = async (id) => {
    let data = await TestServer.getagiliteStatsByUser(id);
    console.log(data , 'hello from the other side')
    setAgilite(data?.data?.total_score * 100 / 100)
  }
  const getJonglageForCurrentUser = async (id) => {
    let data = await TestServer.getJonglageStatsByUser(id);
    setJonglage(data?.data?.points * 100 / 100)
  }
  const getTirForCurrentUser = async (id) => {
    let data = await TestServer.getTirStatsByUser(id);
    setTir(data?.somme * 100 / 300) 

  }


  useEffect(() => {
    getVitesseForCurrentUser(id)
    getSautForCurrentUser(id)
    getConduitForCurrentUser(id)
    getAgiliteForCurrentUser(id)
    getJonglageForCurrentUser(id)
    getTirForCurrentUser(id)
    console.log('vittt', jonglage, 'new')
  }, [])

  const data = {
    labels: ['VITESSE', 'SAUT', 'TIR AU BUT', 'CONDUITE DE BALLE', 'JONGLAGE', 'AGILITÉ'],
    datasets: [
      {
        label: 'Performance',
        data: [vitesse, saut, tir, conduit, jonglage, agilite],
        backgroundColor: 'rgba(191, 222, 254, 0.1)',
        borderColor: '#BFDEFE',
        borderWidth: 2,


      },
    ],
  };

  const options = {
    scales: {

      r: {
        angleLines: {
          color: '#ffffff',
          borderWidth: 4,

        },
        ticks: {
          display: false,
          drawTicks: false,
          maxTicksLimit: 3,
          count: 3,
          borderDash: [6],
          borderDashOffset: [5], // Show only the last two ticks
          callback: function (value, index, values) {
            return ''; // Hide the labels for these ticks
          },
        },
        grid: {

          color: '#ffffff',

          lineWidth: 2,
          borderDash: [5, 5],      // Create dashed lines (array of lengths)
          tickLength: 3,        // Offset for dashed lines
        },
        pointLabels: {
          color: '#ffffff',
          font: {
            size: 16,
            weight: '600',
            padding: 10
          },
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      plugins: [dashedLinePlugin]
    },
  };

  return (



    <div className="flex flex-col px-8 py-6 bg-[linear-gradient(52deg,#3C8AF5_0.06%,#2E71EB_24.43%,#1E56D7_75.66%,#1F46AE_99.53%)] rounded-[10px] h-full text-white max-md:px-5">
      <div className="w-full h-full">
        <div className="text-3xl font-bold text-white max-md:max-w-full">
          Performance Radar
        </div>
        <Radar data={data} options={options} />
      </div>
    </div>

  );
};

export default RadarChart;
