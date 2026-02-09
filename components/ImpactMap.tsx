
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const ImpactMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 400;
    const height = 240;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Create a stylized city grid
    const g = svg.append("g");
    
    // Background
    g.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#f1f5f9");

    // Grid lines
    for(let i = 0; i < width; i += 40) {
      g.append("line").attr("x1", i).attr("y1", 0).attr("x2", i).attr("y2", height).attr("stroke", "#e2e8f0").attr("stroke-width", 1);
    }
    for(let i = 0; i < height; i += 40) {
      g.append("line").attr("x1", 0).attr("y1", i).attr("x2", width).attr("y2", i).attr("stroke", "#e2e8f0").attr("stroke-width", 1);
    }

    // Nodes representing requests
    const nodes = [
      { x: 100, y: 80, color: '#f97316', pulse: true, label: 'Food Need' },
      { x: 300, y: 150, color: '#0d9488', pulse: false, label: 'Volunteer' },
      { x: 150, y: 180, color: '#ef4444', pulse: true, label: 'Emergency Meds' },
      { x: 250, y: 60, color: '#f97316', pulse: true, label: 'Groceries' },
    ];

    nodes.forEach(node => {
      if (node.pulse) {
        g.append("circle")
          .attr("cx", node.x)
          .attr("cy", node.y)
          .attr("r", 4)
          .attr("fill", node.color)
          .append("animate")
          .attr("attributeName", "r")
          .attr("from", "4")
          .attr("to", "12")
          .attr("dur", "1.5s")
          .attr("begin", "0s")
          .attr("repeatCount", "indefinite");

        g.append("circle")
          .attr("cx", node.x)
          .attr("cy", node.y)
          .attr("r", 4)
          .attr("fill", node.color)
          .attr("opacity", 0.3)
          .append("animate")
          .attr("attributeName", "opacity")
          .attr("from", "0.6")
          .attr("to", "0")
          .attr("dur", "1.5s")
          .attr("begin", "0s")
          .attr("repeatCount", "indefinite");
      }

      g.append("circle")
        .attr("cx", node.x)
        .attr("cy", node.y)
        .attr("r", 6)
        .attr("fill", node.color)
        .attr("stroke", "#fff")
        .attr("stroke-width", 2);
    });

    // Interaction text
    g.append("text")
      .attr("x", 10)
      .attr("y", 20)
      .attr("font-size", "10px")
      .attr("font-weight", "600")
      .attr("fill", "#64748b")
      .text("LIVE ACTIVITY MAP");

  }, []);

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <svg ref={svgRef} className="w-full h-auto" viewBox="0 0 400 240"></svg>
      <div className="p-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500 font-medium">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span> 4 Active Requests nearby
        </span>
        <button className="text-orange-600 font-bold hover:underline">Expand View</button>
      </div>
    </div>
  );
};

export default ImpactMap;
