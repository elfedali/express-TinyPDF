const axios = require("axios");

require("bootstrap");
require("axios");

$ = jQuery = require("jquery");

$(function () {
  const $form = $("#uploadForm");
  const $file = $("#pdfFile"); // Fixed selector
  const $progress = $("#progress");
  const $progressBar = $progress.find(".progress-bar");
  const $message = $("#message");
  const $original = $("#original");
  const $compressed = $("#compressed");
  const $submitButton = $form.find("button[type='submit']");
  const $spinner = $submitButton.find(".spinner-grow");

  axios.defaults.baseURL = "http://localhost:3000";
  axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

  $form.on("submit", async (event) => {
    event.preventDefault();
    $message.text("").removeClass("text-success text-danger");

    if ($file[0].files.length === 0) {
      $message.text("Please select a PDF file.").addClass("text-danger");
      return;
    }

    $progress.removeClass("d-none");
    $progressBar.css("width", "0%").text("0%");
    $message.text("Uploading file...");
    $spinner.removeClass("d-none");
    $submitButton.prop("disabled", true);

    const formData = new FormData();
    formData.append("pdf", $file[0].files[0]);

    try {
      const response = await axios.post("/pdf", formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          $progressBar.css("width", progress + "%").text(progress + "%");
        },
      });

      $message.text(response.data.message).addClass("text-success");
      $original.attr("href", response.data.original).removeClass("d-none");
      $compressed.attr("href", response.data.compressed).removeClass("d-none");
    } catch (error) {
      $message.text("Error uploading file").addClass("text-danger");
      console.error(error);
    } finally {
      $progress.addClass("d-none");
      $spinner.addClass("d-none");
      $submitButton.prop("disabled", false);
    }
  });
});
