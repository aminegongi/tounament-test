import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const pxToMm = (px) => {
    return Math.floor(px / document.getElementById('myMm').offsetHeight);
};

const mmToPx = (mm) => {
    return 4 * mm;
};

const range = (start, end) => {
    return Array(end - start).join(0).split(0).map(function (val, id) { return id + start });
};


const PrintButton = ({ id, label, className, onClick }) => (<button className={`${className}`}>
    {/*
    Getting pixel height in milimeters:
    https://stackoverflow.com/questions/7650413/pixel-to-mm-equation/27111621#27111621
  */}
    {/* <div id="myMm" style={{ height: "1mm" }} /> */}


    <div
        className={``}
        onClick={() => {
            onClick(true)
            setTimeout(() => {
                const input = document.getElementById(id);
                const inputHeightMm = 770 //pxToMm(input.offsetHeight);
                const a4WidthMm = 770; //210
                const a4HeightMm = 297;
                const a4HeightPx = mmToPx(a4HeightMm);
                const numPages = inputHeightMm <= a4HeightMm ? 1 : Math.floor(inputHeightMm / a4HeightMm) + 1;
                console.log({
                    input, inputHeightMm, a4HeightMm, a4HeightPx, numPages, range: range(0, numPages),
                    comp: inputHeightMm <= a4HeightMm, inputHeightPx: input.offsetHeight
                });


                html2canvas(input)
                    .then((canvas) => {
                        const imgData = canvas.toDataURL('image/png');

                        // Document of a4WidthMm wide and inputHeightMm high
                        if (inputHeightMm > a4HeightMm) {
                            // elongated a4 (system print dialog will handle page breaks)
                            const pdf = new jsPDF('p', 'mm', [inputHeightMm + 16, a4WidthMm]);
                            pdf.addImage(imgData, 'PNG', 0, 0);
                            pdf.save(`${id}.pdf`);
                        } else {
                            // standard a4
                            const pdf = new jsPDF("p");
                            pdf.addImage(imgData, 'PNG', 0, 0);
                            pdf.save(`${id}.pdf`);
                        }


                    });
                ;
            }, 100);

            ////////////////////////////////////////////////////////
            // System to manually handle page breaks
            // Wasn't able to get it working !
            // The idea is to break html2canvas screenshots into multiple chunks and stich them together as a pdf
            // If you get this working, please email me a khuranashivek@outlook.com and I'll update the article
            ////////////////////////////////////////////////////////
            // range(0, numPages).forEach((page) => {
            //   console.log(`Rendering page ${page}. Capturing height: ${a4HeightPx} at yOffset: ${page*a4HeightPx}`);
            //   html2canvas(input, {height: a4HeightPx, y: page*a4HeightPx})
            //     .then((canvas) => {
            //       const imgData = canvas.toDataURL('image/png');
            //       console.log(imgData)
            //       if (page > 0) {
            //         pdf.addPage();
            //       }
            //       pdf.addImage(imgData, 'PNG', 0, 0);
            //     });
            //   ;
            // });

            // setTimeout(() => {
            //   pdf.save(`${id}.pdf`);
            // }, 5000);


        }}
    >
        {label}
    </div>
</button>);

export default PrintButton;