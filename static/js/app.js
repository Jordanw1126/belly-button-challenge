// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    const metadata = data.metadata;
    // Log the metadata
    console.log("Metadata:", metadata);

    // Filter the metadata for the object with the desired sample number
    const result = metadata.filter(sampleObj => sampleObj.id == sample)[0];
    // Log the result of filtering
    console.log("Filtered result:", result);

    // Use d3 to select the panel with id of `#sample-metadata`
    const panel = d3.select("#sample-metadata");
    // Log the panel before appending new elements
    console.log("Panel before appending:", panel);

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(result).forEach(([key, value]) => {
    panel.append("h6").text(`${key}: ${value}`);
    });
    // Log the panel after appending new elements
    console.log("Panel after appending:", panel);
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    const samples = data.samples;

    // Filter the samples for the object with the desired sample number
    const result = samples.filter(sampleObj => sampleObj.id == sample)[0];

    // Get the otu_ids, otu_labels, and sample_values
    const otuIDs = result.otu_ids;
    const sampleValues = result.sample_values;
    const otuLabels = result.otu_labels;

    // Build a Bubble Chart
    const bubbleTrace = {
      x: otuIDs,
      y: sampleValues,
      text: otuLabels,
      mode: 'markers',
      marker: {
        size: sampleValues,
        color: otuIDs,
        colorscale: 'Earth',
      }
    };

    const bubbleData = [bubbleTrace];

    const bubbleLayout = {
      title: 'Bubble Chart',
      xaxis: { title: 'OTU ID' },
      yaxis: { title: 'Number of Bacteria' },
      showlegend: false,
      height: 400,
      width: 600
    };

    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    // Render the Bubble Chart


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    const yticks = otuIDs.map(id => `OTU ${id}`);

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately

        // Create the Bar Chart
        const barTrace = {
          x: sampleValues.slice(0, 10).reverse(), // Take top 10 and reverse for proper order
          y: yticks.slice(0, 10).reverse(), // Corresponding yticks
          type: 'bar',
          orientation: 'h', // Horizontal bar chart
      };

      const barData = [barTrace];

      const barLayout = {
          title: 'Top 10 Bacteria Cultures Found',
          xaxis: { title: 'Number of Bacteria' },
          yaxis: { title: 'OTU IDs' },
          height: 400,
          width: 500
      };

      Plotly.newPlot('bar', barData, barLayout);

    // Render the Bar Chart

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    const sampleNames = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    const dropdown = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    sampleNames.forEach(sample => {
      // Append a new option for each sample name
      dropdown.append("option")
          .text(sample) // Set the displayed text for the option
          .property("value", sample); 
    });

    // Get the first sample from the list
    const firstSample = sampleNames[0];
    buildMetadata(firstSample);
    buildCharts(firstSample);

    // Build charts and metadata panel with the first sample
    dropdown.on("change", function() {
      const selectedSample = d3.select(this).property("value");
      buildMetadata(selectedSample);
      buildCharts(selectedSample);
  });
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
