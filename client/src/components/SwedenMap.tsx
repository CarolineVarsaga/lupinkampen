import { useState, useEffect } from "react";
import { fetchTopMunicipalities } from "../services/leaderboardService";
import axios from "axios";

const SwedenMap = () => {
  const [leadingMunicipalityId, setLeadingMunicipalityId] = useState<
    number | null
  >(null);
  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchSVG = async () => {
      try {
        const response = await axios.get("/assets/sweden.svg");
        setSvgContent(response.data);
      } catch (error) {
        console.error("Error loading SVG", error);
      }
    };

    fetchSVG();
  }, []);

  useEffect(() => {
    const fetchLeadingMunicipality = async () => {
      try {
        const municipalities = await fetchTopMunicipalities();
        const leadingMunicipality = municipalities[0];
        setLeadingMunicipalityId(leadingMunicipality.municipalityId);
      } catch (error) {
        console.error("Error fetching leading municipality", error);
      }
    };

    fetchLeadingMunicipality();
  }, []);

  useEffect(() => {
    if (leadingMunicipalityId && svgContent) {
      const parser = new DOMParser(); // turns the svgContent string into a manipulable DOM
      const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");
      const leadingPath = svgDoc.getElementById(String(leadingMunicipalityId));
      const leadingPathClass = svgDoc.getElementsByClassName(
        String(leadingMunicipalityId)
      );

      if (leadingPath) {
        leadingPath.setAttribute("fill", "orange");
      }
      if (leadingPathClass.length > 0) {
        Array.from(leadingPathClass).forEach((pathElement) => {
          pathElement.setAttribute("fill", "orange");
        });
      }
      if (!leadingPath && leadingPathClass.length === 0) {
        console.error(
          `Path with ID or Class ${leadingMunicipalityId} not found`
        );
      }
      setSvgContent(svgDoc.documentElement.outerHTML); // turns back to svg
    }
  }, [leadingMunicipalityId, svgContent]);

  return (
    <div className="sweden-map map">
      <div dangerouslySetInnerHTML={{ __html: svgContent || "" }} />
    </div>
  );
};

export default SwedenMap;
