import { useState, useEffect } from "react";
import { baseURL } from "../utils/baseUrl";

interface IMunicipality {
  municipalityId: number;
}

const SwedenMap = () => {
  const [leadingMunicipalityId, setLeadingMunicipalityId] =
    useState<IMunicipality | null>(null);
  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchSVG = async () => {
      try {
        const response = await fetch("/assets/sweden.svg");
        const svgText = await response.text();
        setSvgContent(svgText);
        console.log("SVG fetched successfully");
      } catch (error) {
        console.error("Error loading SVG", error);
      }
    };

    fetchSVG();
  }, []);

  useEffect(() => {
    const fetchLeadingMunicipality = async () => {
      try {
        const response = await fetch(
          `${baseURL}/api/municipalities/topMunicipalities`
        );
        const data = await response.json();
        console.log("Fetched leading municipality data:", data);

        const leadingMunicipality = data[0];
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
        console.log(`Path with ID or Class ${leadingMunicipalityId} not found`);
      }
      setSvgContent(svgDoc.documentElement.outerHTML);
    }
  }, [leadingMunicipalityId, svgContent]);

  return (
    <div className="sweden-map map">
      <div dangerouslySetInnerHTML={{ __html: svgContent || "" }} />
    </div>
  );
};

export default SwedenMap;
