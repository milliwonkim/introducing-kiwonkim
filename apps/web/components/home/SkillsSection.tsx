"use client";

import { useRef, useEffect, useMemo } from "react";
import * as d3 from "d3";

/**
 * @description 기술 스택 차트 데이터 타입
 */
interface SkillData {
  name: string;
  level: number;
  category: "frontend" | "library" | "tools";
  color: string;
}

/**
 * @description 기술 스택을 시각화하는 섹션 컴포넌트
 */
const SkillsSection = () => {
  const chartRef = useRef<SVGSVGElement>(null);

  const skillsData = useMemo<SkillData[]>(
    () => [
      { name: "React", level: 90, category: "frontend", color: "#61DAFB" },
      { name: "Next.js", level: 85, category: "frontend", color: "#000000" },
      { name: "TypeScript", level: 88, category: "frontend", color: "#3178C6" },
      {
        name: "TailwindCSS",
        level: 85,
        category: "frontend",
        color: "#06B6D4",
      },
      { name: "Three.js", level: 75, category: "library", color: "#000000" },
      { name: "D3.js", level: 70, category: "library", color: "#F9A03C" },
      {
        name: "Framer Motion",
        level: 80,
        category: "library",
        color: "#FF69B4",
      },
      { name: "Git", level: 85, category: "tools", color: "#F05032" },
      { name: "Webpack", level: 75, category: "tools", color: "#8DD6F9" },
      { name: "Vite", level: 80, category: "tools", color: "#646CFF" },
    ],
    []
  );

  useEffect(() => {
    if (!chartRef.current) return;

    const svg = d3.select(chartRef.current);
    const width = chartRef.current.clientWidth;
    const height = 350;
    const margin = { top: 40, right: 20, bottom: 60, left: 30 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand()
      .domain(skillsData.map((d) => d.name))
      .range([0, chartWidth])
      .padding(0.4);

    const y = d3.scaleLinear().domain([0, 100]).range([chartHeight, 0]);

    const xAxis = d3.axisBottom(x).tickSizeOuter(0);
    const yAxis = d3.axisLeft(y).ticks(5).tickSizeOuter(0);

    chart
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(xAxis)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .call((g: any) =>
        g.select(".domain").attr("stroke", "var(--border-color, #e2e8f0)")
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .call((g: any) =>
        g.selectAll(".tick line").attr("stroke", "var(--border-color, #e2e8f0)")
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .call((g: any) =>
        g
          .selectAll("text")
          .attr("fill", "var(--content-subtle-color, #718096)")
          .attr("transform", "translate(-10,5)rotate(-45)")
          .style("text-anchor", "end")
          .style("font-size", "11px")
      );

    chart
      .append("g")
      .attr("class", "y-axis")
      .call(yAxis)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .call((g: any) => g.select(".domain").remove())
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .call((g: any) =>
        g
          .selectAll(".tick line")
          .attr("stroke", "var(--border-color, #e2e8f0)")
          .attr("stroke-dasharray", "2,2")
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .call((g: any) =>
        g
          .selectAll("text")
          .attr("fill", "var(--content-subtle-color, #718096)")
          .style("font-size", "11px")
      );

    const bars = chart
      .selectAll(".bar")
      .data(skillsData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d: SkillData) => x(d.name)!)
      .attr("y", chartHeight)
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("fill", "var(--primary-color, #3182f6)")
      .attr("rx", 3)
      .attr("ry", 3);

    bars
      .transition()
      .duration(800)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .delay((_d: any, i: number) => i * 50)
      .attr("y", (d: SkillData) => y(d.level))
      .attr("height", (d: SkillData) => chartHeight - y(d.level))
      .attr("opacity", 0.9);

    bars
      .on("mouseover", (event: MouseEvent) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        d3.select(event.currentTarget as any)
          .transition()
          .duration(150)
          .attr("opacity", 1);
      })
      .on("mouseout", (event: MouseEvent) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        d3.select(event.currentTarget as any)
          .transition()
          .duration(150)
          .attr("opacity", 0.9);
      });

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "600")
      .style("fill", "var(--content-color, #1a202c)")
      .text("주요 기술 역량");

    return () => {
      svg.selectAll("*").remove();
    };
  }, [skillsData]);

  return (
    <section
      id="skills"
      className="py-16 lg:py-24 bg-background-subtle dark:bg-background-darkSubtle"
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-1">
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-content dark:text-content-dark">
                보유 기술
              </h3>
              <p className="text-content-subtle dark:text-content-darkSubtle text-sm md:text-base leading-relaxed">
                웹 프론트엔드 개발을 위한 핵심 기술부터 인터랙티브 시각화
                라이브러리까지, 다양한 기술 스택을 활용하여 사용자 중심의 웹
                애플리케이션을 개발합니다. 항상 최신 기술 트렌드를 학습하고
                프로젝트에 적용하기 위해 노력합니다.
              </p>
            </div>

            <div className="lg:col-span-2 bg-white dark:bg-gray-800 shadow rounded-lg p-4 md:p-6 min-h-[400px]">
              <svg ref={chartRef} width="100%" height="350"></svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
