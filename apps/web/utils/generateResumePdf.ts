/**
 * 브라우저의 인쇄 기능을 사용하여 PDF를 생성하는 함수
 */
export const generateResumePDF = async () => {
  try {
    // 로딩 상태 표시
    const loadingToast = document.createElement("div");
    loadingToast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #3B82F6;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 10000;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    loadingToast.textContent = "이력서 PDF 준비 중...";
    document.body.appendChild(loadingToast);

    // 네비게이션 바를 인쇄에서 제외하기 위한 클래스 추가
    const navbar = document.querySelector("nav");
    if (navbar) {
      navbar.classList.add("no-print");
    }

    // 인쇄용 스타일 추가
    const printStyle = document.createElement("style");
    printStyle.textContent = `
      @media print {
        .no-print {
          display: none !important;
        }
        body {
          margin: 0;
          padding: 0;
          font-size: 12pt;
          line-height: 1.4;
        }
        main {
          margin: 0 !important;
          padding: 0 !important;
        }
        .container {
          max-width: none !important;
          margin: 0 !important;
          padding: 20px !important;
        }
        /* 그라데이션을 단색으로 변경 */
        .bg-gradient-to-br,
        .bg-gradient-to-r {
          background: #f8fafc !important;
        }
        /* 그림자 제거 */
        .shadow-lg,
        .shadow-xl,
        .shadow-md {
          box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
        }
        /* 페이지 브레이크 조정 */
        .break-inside-avoid {
          break-inside: avoid;
          page-break-inside: avoid;
        }
        /* 색상 최적화 */
        .text-blue-600 {
          color: #2563eb !important;
        }
        .bg-blue-600 {
          background-color: #2563eb !important;
        }
      }
    `;
    document.head.appendChild(printStyle);

    // 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);

    // 잠시 대기 (렌더링 완료를 위해)
    await new Promise((resolve) => setTimeout(resolve, 300));

    // 로딩 토스트 제거
    document.body.removeChild(loadingToast);

    // 성공 토스트 표시
    const successToast = document.createElement("div");
    successToast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10B981;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 10000;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    successToast.textContent =
      "인쇄 대화상자가 열립니다. 'PDF로 저장'을 선택해주세요.";
    document.body.appendChild(successToast);

    // 3초 후 성공 토스트 제거
    setTimeout(() => {
      if (document.body.contains(successToast)) {
        document.body.removeChild(successToast);
      }
    }, 5000);

    // 인쇄 대화상자 열기
    setTimeout(() => {
      window.print();

      // 인쇄 후 스타일 정리
      setTimeout(() => {
        if (navbar) {
          navbar.classList.remove("no-print");
        }
        if (document.head.contains(printStyle)) {
          document.head.removeChild(printStyle);
        }
      }, 1000);
    }, 1000);
  } catch (error) {
    console.error("PDF 생성 중 오류가 발생했습니다:", error);

    // 에러 토스트 표시
    const errorToast = document.createElement("div");
    errorToast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #EF4444;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 10000;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    errorToast.textContent = "PDF 생성 중 오류가 발생했습니다.";
    document.body.appendChild(errorToast);

    setTimeout(() => {
      if (document.body.contains(errorToast)) {
        document.body.removeChild(errorToast);
      }
    }, 3000);
  }
};
