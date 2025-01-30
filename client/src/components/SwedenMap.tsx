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
      const parser = new DOMParser();
      const svgDocument = parser.parseFromString(svgContent, "image/svg+xml");
      const leadingPath = svgDocument.getElementById(
        String(leadingMunicipalityId)
      );
      const leadingPathClass = svgDocument.getElementsByClassName(
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
      setSvgContent(svgDocument.documentElement.outerHTML);
    }
  }, [leadingMunicipalityId, svgContent]);

  return (
    <div className="sweden-map map">
      <div dangerouslySetInnerHTML={{ __html: svgContent || "" }} />
    </div>
  );
};

export default SwedenMap;

/*
///   Some comments on this code   ///
* 14. fetch / axios = makes it possible to manipulate the svg
* 40. creates a DOMParser instance to parse XML/HTML strings and convert them into a DOM document
* 41. turns the svgContent string into a manipulable DOM
* 62. turns back to svg
*/
