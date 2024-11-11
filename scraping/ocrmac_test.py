from ocrmac import ocrmac

SCREENSHOT = "files/screenshot.png"
PAGE = "./files/test2.png"
ocr = ocrmac.OCR(PAGE, recognition_level="accurate")
# annotations = ocr.recognize()
# print(annotations)
result = ocr.annotate_PIL()
result.show()
