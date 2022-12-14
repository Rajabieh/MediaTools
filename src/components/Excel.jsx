import React from "react";
import { MTColumn, MTRow } from "mt-ui";
import ExcelDropzone from "../excel-dropzone";
import { useNavigate } from "react-router-dom";

function Excel({ onImportUsers }) {
  const navigate = useNavigate();

  const handleSheetData = (data) => {
    onImportUsers(data);
    navigate("/highscores");
  };

  return (
    <MTRow>
      <MTColumn width={20}>
        <ExcelDropzone
          onSheetDrop={handleSheetData}
          label="Drop your file here"
        />
      </MTColumn>
      <MTColumn width={75} offset={5}>
        <div>
          <h2>Initial site</h2>
          <p>
            Drop the excel file scores.xlsx that you will find in this repo in
            the area to the left and watch the log output in the console. We
            hope this is enough to get you started with the import.
          </p>
        </div>
        <div>
          <h2>Explaining the grid</h2>
          <p>
            In the Mediatool grid you can use MTRow and MTColumn to structure
            your graphical components. This is basically what you need to know:
          </p>
          <ul>
            <li>
              The index.jsx file uses these components so you can see an example
              of how they work
            </li>
            <li>MTRow will always create a line break</li>
            <li>
              MTColumns will stretch to the width of the entire row, unless you
              use the properties width and offset
            </li>
            <li>Width and offset is set in percent</li>
          </ul>
        </div>
      </MTColumn>
    </MTRow>
  );
}

export default Excel;
