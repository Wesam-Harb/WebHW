let info = [
  {
    name: "Google Bard",
    usage: "مساعدة بالبحث وتوليد نص",
    cost: "مجاني",
    developer: "Google",
    site: "https://bard.google.com",
    description:
      "مساعد ذكي من جوجل لمساعدة البحث وإنشاء نصوص وإجابات سريعة باستخدام نماذج لغوية كبيرة.",
    logo: "https://www.google.com/images/branding/product/1x/search_48dp.png",
  },
  {
    name: "Microsoft Copilot",
    usage: "إنتاجية ومساعدة برمجية",
    cost: "مدفوع / ضمن Microsoft 365",
    developer: "Microsoft",
    site: "https://www.microsoft.com/copilot",
    description:
      "مساعد ذكي مدمج في منتجات Microsoft لتعزيز الإنتاجية والكتابة والبرمجة.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    name: "Claude",
    usage: "محادثة ومساعد ذكي",
    cost: "مجاني تجريبي / مدفوع",
    developer: "Anthropic",
    site: "https://www.anthropic.com",
    description:
      "نموذج محادثة يركز على الأمان والقابلية للتحكم في المخرجات لتقديم مساعدة ذكية.",
    logo: "https://www.anthropic.com/static/images/anthropic-logo.png",
  },
  {
    name: "DALL·E",
    usage: "توليد صور بالذكاء الاصطناعي",
    cost: "مجاني/مدفوع حسب الاستخدام",
    developer: "OpenAI",
    site: "https://labs.openai.com",
    description: "مولد صور يعتمد على أوصاف نصية لإنشاء صور إبداعية ومخصصة.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/OpenAI_Logo.svg",
  },
  {
    name: "Midjourney",
    usage: "توليد صور إبداعية",
    cost: "مدفوع (اشتراك)",
    developer: "Midjourney",
    site: "https://www.midjourney.com",
    description:
      "خدمة توليد صور تعتمد على نماذج ذكاء اصطناعي لإنشاء أعمال فنية عالية الجودة.",
    logo: "https://pbs.twimg.com/profile_images/1593786746767713281/3R0gq8q7_400x400.jpg",
  },
];

// ...existing code...
info = JSON.parse(window.localStorage.getItem("appsInfo")) || info;
info.forEach((app) => {
  if ($("tbody").length) {
    $("tbody").append(`
      <tr>
        <td data-label="رابط التحميل">
          <button class="expand">اظهار المزيد</button>
        </td>
        <td data-label="مجاني / غير مجاني">${app.cost || ""}</td>
        <td data-label="مجال الاستخدام">${app.usage || ""}</td>
        <td data-label="اسم الشركة المطورة">${app.developer || ""}</td>
        <td data-label="اسم التطبيق">${app.name || ""}</td>
      </tr>
      <tr class="expand-row" hidden>
        <td colspan="5">
          <div class="expand-content" aria-hidden="true">
            <img style="max-width: 100%; width: 80px" class="logo" src="${
              app.logo || ""
            }" alt="${app.name} logo" />
            <div class="meta">
              <div>
                <strong>الموقع:</strong>
                <a href="${app.site || "#"}" target="_blank" rel="noopener">${
      app.site || ""
    }</a>
              </div>
              <p>${app.description || ""}</p>
            </div>
          </div>
        </td>
      </tr>
    `);
  }
});
function addEvent() {
  // unbind then bind to avoid duplicates
  $(".expand")
    .off("click")
    .on("click", function () {
      const $button = $(this);
      const $expandedRow = $button.closest("tr").next("tr.expand-row");
      $expandedRow.toggleClass("expanded");
      if ($expandedRow.hasClass("expanded")) {
        $button.text("إخفاء").attr("aria-expanded", "true");
        $expandedRow.show().attr("hidden", false);
      } else {
        $button.text("اظهار المزيد").attr("aria-expanded", "false");
        $expandedRow.hide().attr("hidden", true);
      }
    });

  if ($("form .reset").length) {
    $("form .reset")
      .off("click")
      .on("click", function () {
        resetForm();
      });
  }
}

$(function () {
  addEvent();
  if ($(".add").length) {
    $(".add").on("click", function (e) {
      console.log("Form submitted");
      const name = $("#appName").val() || "";
      const usage = $("#using").val() || "";
      const downloadLink = $("#downloadLink").val() || "";
      const newApp = {
        name: name,
        usage: usage,
        developer: "غير معروف",
        site: downloadLink,
        description: "لا يوجد وصف متاح.",
        logo: "https://via.placeholder.com/80",
      };
      info.push(newApp);
      window.localStorage.setItem("appsInfo", JSON.stringify(info));
      if ($("tbody").length) {
        $("tbody").append(`
  <tr>
          <td data-label="رابط التحميل">
            <button class="expand">اظهار المزيد</button>
          </td>
          <td data-label="مجاني / غير مجاني">${newApp.cost}</td>
          <td data-label="مجال الاستخدام">${newApp.usage}</td>
          <td data-label="اسم الشركة المطورة">${newApp.developer}</td>
          <td data-label="اسم التطبيق">${newApp.name}</td>
        </tr>
  <tr class="expand-row" hidden>
          <td colspan="5">
            <div class="expand-content" aria-hidden="true">
              <img
                style="max-width: 100%; width: 80px"
                class="logo"
                src="${newApp.logo}"
                alt="Google Bard logo"
              />
              <div class="meta">
                <div>
                  <strong>الموقع:</strong>
                  <a
                    href="${newApp.site}"
                    target="_blank"
                    rel="noopener"
                    >bard.google.com</a
                  >
                </div>
                <p>
                    ${newApp.description}
                </p>
              </div>
            </div>
          </td>
        </tr>
    `);
      }
      addEvent();
      resetForm();
      window.location.href = "app.html";
    });
  }
});

function resetForm() {
  $("#addAppForm")[0].reset();
}
