Search.setIndex({"docnames": ["index", "source/client/clickjacking/clickjacking", "source/client/cors/cors", "source/client/csrf/csrf", "source/client/dom-based/dom-base", "source/client/websockets/websockets", "source/client/xss/cross-site-scripting", "source/server/race_conditions", "source/server/readme"], "filenames": ["index.rst", "source/client/clickjacking/clickjacking.md", "source/client/cors/cors.md", "source/client/csrf/csrf.md", "source/client/dom-based/dom-base.md", "source/client/websockets/websockets.md", "source/client/xss/cross-site-scripting.md", "source/server/race_conditions.rst", "source/server/readme.md"], "titles": ["PortSwigger \u5b66\u4e60\u6307\u5357", "Clickjacking (UI redressing)", "Cross-origin resource sharing (CORS)", "Cross-site request forgery (CSRF)", "&lt;no title&gt;", "Testing for WebSockets security vulnerabilities", "Cross-site scripting", "\u6761\u4ef6\u7ade\u4e89", "\u6761\u4ef6\u7ade\u4e89"], "terms": {"index": [0, 1], "modul": 0, "search": [0, 6], "page": [0, 1, 2, 3], "In": [1, 2, 3, 5, 6], "thi": [1, 2, 3, 5, 6], "section": [1, 2, 3, 5, 6], "we": [1, 2, 3, 5, 6], "ll": [3, 5, 6], "explain": [1, 2, 3, 5, 6], "describ": [1, 2, 3, 5, 6], "differ": [1, 3, 6], "varieti": 6, "spell": 6, "out": [3, 5, 6], "also": [2, 3, 5, 6], "known": [3, 5, 6], "web": [1, 2, 3, 5, 6], "allow": [1, 3, 5, 6], "an": [1, 2, 3, 5, 6], "compromis": [2, 3, 6], "interact": [1, 2, 3, 6], "user": [1, 2, 3, 5, 6], "have": [1, 2, 3, 5, 6], "applic": [1, 2, 3, 5, 6], "It": [2, 3, 5, 6], "circumv": [1, 2, 3, 6], "same": [0, 1, 3, 5, 6], "origin": [0, 1, 3, 5, 6], "which": [1, 2, 3, 5, 6], "design": [3, 5, 6], "segreg": 6, "websit": [1, 2, 3, 6], "from": [0, 1, 3, 5, 6], "each": [3, 6], "other": [1, 2, 3, 5, 6], "normal": [1, 2, 3, 6], "masquerad": 6, "victim": [1, 2, 3, 5, 6], "carri": [3, 5, 6], "ani": [2, 3, 5, 6], "action": [1, 3, 5, 6], "abl": [2, 3, 6], "perform": [1, 2, 3, 5, 6], "access": [1, 2, 3, 5, 6], "": [1, 2, 3, 5, 6], "data": [1, 2, 3, 5, 6], "If": [1, 2, 3, 5, 6], "ha": [1, 3, 5, 6], "privileg": [3, 5, 6], "within": [1, 2, 3, 5, 6], "might": [1, 2, 3, 5, 6], "gain": [2, 3, 6], "full": [2, 3, 5, 6], "control": [1, 2, 3, 5, 6], "over": [1, 2, 3, 5, 6], "all": [1, 2, 3, 5, 6], "function": [1, 2, 3, 5, 6], "manipul": [1, 6], "so": [1, 2, 5, 6], "return": [1, 2, 6], "malici": [1, 2, 3, 6], "javascript": [1, 2, 6], "when": [1, 2, 3, 5, 6], "code": [5, 6], "execut": [1, 6], "insid": 6, "browser": [1, 2, 3, 5, 6], "fulli": [3, 6], "you": [1, 2, 3, 5, 6], "re": [1, 2, 3, 5, 6], "alreadi": [1, 2, 3, 5, 6], "familiar": [1, 2, 3, 5, 6], "basic": [2, 3, 5, 6], "behind": [1, 2, 3, 5, 6], "just": [1, 2, 3, 5, 6], "want": [1, 2, 3, 5, 6], "practic": [1, 2, 3, 5, 6], "exploit": [0, 1, 6], "them": [1, 2, 3, 5, 6], "some": [1, 2, 3, 5, 6], "realist": [1, 2, 3, 5, 6], "deliber": [1, 2, 3, 5, 6], "target": [1, 2, 3, 5, 6], "topic": [1, 2, 3, 5, 6], "link": [1, 2, 3, 5, 6], "below": [1, 2, 3, 5, 6], "view": [1, 2, 3, 5, 6], "confirm": 6, "most": [2, 3, 6], "kind": [5, 6], "payload": 6, "caus": [3, 5, 6], "your": [1, 2, 3, 5, 6], "own": [3, 6], "arbitrari": [2, 6], "long": [5, 6], "been": [1, 2, 3, 5, 6], "alert": [5, 6], "purpos": [5, 6], "becaus": [1, 2, 6], "short": 6, "harmless": 6, "pretti": 6, "hard": [5, 6], "miss": 6, "successfulli": [3, 5, 6], "call": [2, 6], "fact": 6, "solv": 6, "major": [3, 5, 6], "our": 6, "invok": 6, "simul": 6, "unfortun": 6, "slight": 6, "hitch": 6, "chrome": [1, 3, 6], "version": [1, 6], "92": 6, "onward": 6, "juli": 6, "20th": 6, "2021": [3, 6], "ifram": [1, 2, 6], "As": [1, 3, 5, 6], "construct": [0, 6], "advanc": 6, "sometim": [5, 6], "need": [1, 2, 3, 5, 6], "altern": [1, 2, 6], "poc": [3, 6], "scenario": 6, "recommend": [1, 6], "print": 6, "interest": [3, 6], "learn": [3, 6], "chang": [3, 6], "why": 6, "like": [1, 2, 3, 5, 6], "check": [1, 2, 3, 6], "blog": 6, "post": [3, 6], "subject": 6, "ve": [3, 6], "amend": 6, "affect": [5, 6], "thei": [1, 2, 3, 5, 6], "indic": 6, "instruct": 6, "wherev": 6, "relev": [3, 6], "There": [3, 5, 6], "three": [3, 6], "main": [1, 6], "These": [1, 2, 3, 5, 6], "where": [1, 2, 3, 6], "come": 6, "current": [1, 6], "http": [1, 2, 3, 5, 6], "request": [0, 1, 5, 6], "databas": 6, "exist": [2, 3, 5, 6], "client": [1, 3, 5, 6], "side": [1, 3, 5, 6], "rather": 6, "than": [2, 3, 6], "server": [1, 3, 5, 6], "simplest": 6, "aris": [0, 3, 5, 6], "receiv": [2, 5, 6], "includ": [1, 2, 3, 5, 6], "immedi": 6, "respons": [1, 2, 6], "unsaf": [5, 6], "wai": [2, 3, 5, 6], "here": [1, 2, 6], "simpl": [3, 6], "exampl": [1, 2, 3, 5, 6], "insecur": [2, 6], "com": [1, 2, 3, 6], "statu": 6, "messag": [3, 6], "well": [3, 5, 6], "p": 6, "The": [1, 2, 3, 5, 6], "doesn": [5, 6], "t": [2, 5, 6], "process": [1, 2, 3, 5, 6], "easili": [2, 3, 6], "bad": 6, "stuff": [2, 6], "visit": [3, 6], "url": [1, 2, 3, 5, 6], "context": [3, 5, 6], "session": [1, 2, 3, 5, 6], "At": 6, "point": 6, "retriev": [2, 6], "cheat": 6, "sheet": 6, "persist": 6, "second": [1, 6], "order": [1, 3, 6], "untrust": [2, 5, 6], "sourc": [1, 2, 6], "its": [1, 2, 6], "later": 6, "submit": [1, 3, 5, 6], "via": [1, 3, 5, 6], "comment": [3, 6], "nicknam": 6, "chat": [5, 6], "room": 6, "contact": 6, "detail": [3, 5, 6], "custom": [5, 6], "case": 6, "arriv": 6, "webmail": 6, "displai": [5, 6], "smtp": 6, "market": 6, "social": [3, 6], "media": [3, 6], "network": 6, "monitor": 6, "packet": 6, "traffic": [2, 6], "A": [1, 2, 3, 6], "board": 6, "let": [1, 3, 5, 6], "hello": [5, 6], "my": 6, "send": [2, 5, 6], "contain": [1, 2, 3, 6], "usual": [1, 6], "write": [1, 6], "back": 6, "follow": [1, 2, 3, 5, 6], "valu": [1, 3, 6], "input": [3, 5, 6], "field": 6, "element": 6, "html": [1, 3, 6], "var": [2, 6], "document": [2, 3, 6], "getelementbyid": 6, "result": [1, 2, 5, 6], "innerhtml": 6, "img": [3, 5, 6], "src": [1, 3, 5, 6], "1": [1, 2, 3, 5, 6], "onerror": [5, 6], "typic": [3, 6], "would": [3, 6], "popul": 6, "part": [1, 2, 6], "queri": 6, "string": [1, 6], "paramet": [1, 3, 6], "deliv": [0, 6], "manner": 6, "who": [2, 3, 6], "imperson": 6, "captur": [5, 6], "login": 6, "credenti": [3, 6], "virtual": [5, 6], "defac": 6, "trojan": 6, "actual": 6, "gener": [1, 3, 6], "depend": [1, 3, 6], "natur": [3, 6], "For": [1, 2, 3, 5, 6], "brochurewar": 6, "anonym": 6, "inform": [1, 2, 5, 6], "public": [2, 6], "often": [1, 2, 3, 5, 6], "minim": [5, 6], "hold": 6, "sensit": [2, 3, 5, 6], "bank": 6, "transact": 6, "email": [1, 3, 6], "healthcar": 6, "record": 6, "seriou": [5, 6], "elev": 6, "critic": 6, "take": [2, 3, 6], "vast": 6, "found": [5, 6], "quickli": 6, "reliabl": 6, "burp": [1, 2, 3, 5, 6, 8], "suit": [1, 2, 3, 5, 6, 8], "scanner": [1, 2, 6], "manual": [1, 3, 6], "involv": [2, 3, 5, 6], "uniqu": [3, 6], "alphanumer": 6, "everi": 6, "entri": [5, 6], "identifi": [1, 3, 6], "locat": [2, 6], "individu": [5, 6], "determin": [1, 3, 5, 6], "whether": [1, 2, 3, 5, 6], "suitabl": [1, 6], "craft": [1, 6], "occur": [1, 3, 6], "select": [1, 3, 5, 6], "similar": [1, 6], "place": [1, 2, 3, 6], "develop": [1, 2, 6], "tool": [1, 3, 6], "howev": [1, 2, 6], "harder": 6, "detect": [1, 5, 6], "To": [1, 5, 6], "non": 6, "cooki": [2, 3, 6], "sink": 6, "settimeout": 6, "substitut": 6, "review": 6, "extrem": 6, "time": [1, 6], "consum": [1, 6], "combin": [2, 6], "static": 6, "dynam": [2, 6], "analysi": 6, "autom": 6, "csp": 6, "mechan": [1, 2, 3, 5, 6], "aim": 6, "mitig": [1, 6], "emploi": [2, 3, 6], "behavior": [1, 2, 3, 6], "hinder": 6, "enabl": [2, 5, 6], "underli": 6, "techniqu": [1, 5, 6], "domain": [1, 2, 3, 5, 6], "situat": [2, 3, 5, 6], "possibl": [1, 2, 3, 6], "due": 6, "filter": 6, "defens": [1, 2, 3, 5, 6], "visibl": [1, 6], "csrf": [0, 1, 2, 5, 6], "token": [1, 2, 3, 5, 6], "unauthor": 6, "behalf": [3, 5, 6], "trivial": 6, "much": 6, "complex": 6, "handl": [3, 5, 6], "effect": [1, 2, 3, 6], "measur": [3, 6], "strictli": 6, "expect": [3, 5, 6], "valid": [2, 3, 6], "encod": 6, "output": 6, "being": [2, 3, 5, 6], "interpret": 6, "activ": 6, "requir": [1, 2, 3, 5, 6], "appli": [1, 2, 6], "css": [1, 6], "appropri": [1, 3, 6], "header": [1, 3, 5, 6], "aren": 6, "intend": [3, 6], "x": [3, 5, 6], "option": [3, 6], "ensur": [1, 2, 5, 6], "last": 6, "line": [1, 6], "reduc": 6, "sever": 6, "still": 6, "veri": [2, 3, 6], "probabl": 6, "frequent": 6, "difficult": [3, 6], "get": [1, 2, 3, 6], "real": 6, "world": 6, "less": [3, 6], "between": [2, 5, 6], "while": [1, 6], "induc": [3, 6], "do": [2, 3, 5, 6], "sql": [5, 6], "php": 6, "whitelist": [1, 6], "charact": 6, "hint": 6, "cast": 6, "escap": 6, "htmlentiti": 6, "ent_quot": 6, "unicod": 6, "java": 6, "librari": 6, "googl": 6, "guava": 6, "\u6761\u4ef6\u7ade\u4e89\u662f\u4e00\u79cd\u5e38\u89c1\u7684\u6f0f\u6d1e\u7c7b\u578b": 8, "\u548c\u4e1a\u52a1\u903b\u8f91\u6f0f\u6d1e\u6709\u7740\u7d27\u5bc6\u7684\u8054\u7cfb": 8, "\u5f53\u7f51\u7ad9\u5904\u7406\u5e76\u53d1\u8bf7\u6c42\u5374\u6ca1\u6709\u505a\u597d\u4fdd\u969c\u63aa\u65bd\u65f6": 8, "\u5c31\u5bb9\u6613\u4ea7\u751f\u6761\u4ef6\u7ade\u4e89\u6f0f\u6d1e": 8, "\u5177\u4f53\u5730\u8bf4": 8, "\u5f53\u7f51\u7ad9\u5728\u5904\u7406\u5e76\u53d1\u8bf7\u6c42\u65f6": 8, "\u53ef\u80fd\u4f1a\u5bfc\u81f4\u591a\u4e2a\u4e0d\u540c\u7684\u8fdb\u7a0b\u540c\u65f6\u8bbf\u95ee\u76f8\u540c\u7684\u6570\u636e": 8, "\u8fd9\u5c31\u4f1a\u4ea7\u751f": 8, "\u78b0\u649e": 8, "\u4ece\u800c\u5bfc\u81f4\u5e94\u7528\u7a0b\u5e8f\u51fa\u73b0\u975e\u9884\u671f\u7684\u884c\u4e3a": 8, "\u6761\u4ef6\u7ade\u4e89\u653b\u51fb\u5c31\u662f\u6307\u9ed1\u5ba2\u5229\u7528\u7cbe\u5fc3\u8bbe\u8ba1\u7684\u8bf7\u6c42\u6545\u610f\u4ea7\u751f": 8, "\u5e76\u51fa\u4e8e\u6076\u610f\u7684\u76ee\u7684\u5229\u7528\u51fa\u73b0\u7684\u975e\u9884\u671f\u884c\u4e3a": 8, "\u53ef\u80fd\u53d1\u751f\u78b0\u649e\u7684\u65f6\u95f4\u6bb5\u79f0\u4e3a": 8, "\u7ade\u4e89\u7a97\u53e3": 8, "\u4f8b\u5982": 8, "\u8fd9\u53ef\u80fd\u662f\u4e0e\u6570\u636e\u5e93\u7684\u4e24\u6b21\u4ea4\u4e92\u4e4b\u95f4\u7684\u51e0\u5206\u4e4b\u4e00\u79d2": 8, "\u4e0e\u5176\u4ed6\u903b\u8f91\u6f0f\u6d1e\u4e00\u6837": 8, "\u6761\u4ef6\u7ade\u4e89\u6f0f\u6d1e\u4ea7\u751f\u7684\u5f71\u54cd\u5728\u5f88\u5927\u7a0b\u5ea6\u4e0a\u53d6\u51b3\u4e8e\u5e94\u7528\u7a0b\u5e8f\u81ea\u8eab\u4ee5\u53ca\u4ea7\u751f\u8be5\u6f0f\u6d1e\u7684\u7279\u5b9a\u529f\u80fd": 8, "\u63a5\u4e0b\u6765\u7684\u5185\u5bb9\u4e3b\u8981\u8bb2\u8ff0\u4ee5\u4e0b\u7684\u77e5\u8bc6": 8, "\u5982\u4f55\u8bc6\u522b\u548c\u5229\u7528\u4e0d\u540c\u7c7b\u578b\u7684\u6761\u4ef6\u7ade\u4e89\u6f0f\u6d1e": 8, "\u5982\u4f55\u5229\u7528": 8, "\u7684\u5185\u7f6e\u5de5\u5177\u8fdb\u884c\u6761\u4ef6\u7ade\u4e89\u653b\u51fb": 8, "\u6709\u5173\u4e8e\u6761\u4ef6\u7ade\u4e89\u7684\u65b9\u6cd5\u8bba": 8, "\u80fd\u591f\u5e2e\u52a9\u6211\u4eec\u68c0\u6d4b\u51fa\u9690\u85cf\u5728\u591a\u4e2a\u6b65\u9aa4\u7684\u8fc7\u7a0b\u4e2d\u7684\u65b0\u578b\u6761\u4ef6\u7ade\u4e89\u6f0f\u6d1e": 8, "\u5728\u672c\u8282\u4e2d": 8, "\u60a8\u5c06\u5b66\u4e60\u5982\u4f55\u8bc6\u522b\u548c\u5229\u7528\u4e0d\u540c\u7c7b\u578b\u7684\u6761\u4ef6\u7ade\u4e89\u6f0f\u6d1e": 8, "\u6211\u4eec\u5c06\u6559\u60a8": 8, "\u7684\u5185\u7f6e\u5de5\u5177\u5982\u4f55\u5e2e\u52a9\u60a8\u514b\u670d\u6267\u884c\u7ecf\u5178\u653b\u51fb\u7684\u6311\u6218": 8, "\u4ee5\u53ca\u4e00\u79cd\u7ecf\u8fc7\u8bd5\u9a8c\u548c\u6d4b\u8bd5\u7684\u65b9\u6cd5": 8, "\u4f7f\u60a8\u80fd\u591f\u5728\u9690\u85cf\u7684\u591a\u6b65\u9aa4\u8fc7\u7a0b\u4e2d\u68c0\u6d4b\u65b0\u7c7b\u522b\u7684\u7ade\u4e89\u6761\u4ef6": 8, "\u8fd9\u4e9b\u8fdc\u8fdc\u8d85\u51fa\u4e86\u60a8\u53ef\u80fd\u5df2\u7ecf\u719f\u6089\u7684\u9650\u5236\u8d85\u9650": 8, "\u4e0b\u9762\u8bb2\u8ff0\u6761\u4ef6\u7ade\u4e89\u6f0f\u6d1e\u7684\u51e0\u79cd\u5e38\u89c1\u7c7b\u578b": 8, "\u6700\u5e38\u89c1\u7684\u4e00\u7c7b\u6761\u4ef6\u7ade\u4e89\u6f0f\u6d1e\u662f\u9ed1\u5ba2\u80fd\u591f\u8d8a\u8fc7\u5e94\u7528\u7a0b\u5e8f\u4e1a\u52a1\u903b\u8f91\u65bd\u52a0\u7684\u67d0\u79cd\u9650\u5236": 8, "\u4e3e\u4e2a\u4f8b\u5b50": 8, "\u5047\u8bbe\u6709\u4e00\u5bb6\u7f51\u5e97": 8, "\u5141\u8bb8\u6d88\u8d39\u8005\u5728\u7ed3\u8d26\u65f6\u8f93\u5165\u4fc3\u9500\u7801\u5bf9\u8ba2\u5355\u8fdb\u884c\u6253\u6298": 8, "\u4e00\u822c\u6765\u8bf4": 8, "\u5e94\u7528\u7a0b\u5e8f\u5b9e\u73b0\u6253\u6298\u7684\u4e1a\u52a1\u903b\u8f91\u5982\u4e0b": 8, "\u68c0\u67e5\u4fc3\u9500\u7801\u662f\u5426\u5df2\u88ab\u4f7f\u7528\u8fc7": 8, "\u5bf9\u8ba2\u5355\u603b\u989d\u8fdb\u884c\u6253\u6298": 8, "\u5728\u6570\u636e\u5e93\u4e2d\u66f4\u65b0\u76f8\u5e94\u8bb0\u5f55": 8, "\u8868\u660e\u4fc3\u9500\u7801\u5df2\u88ab\u4f7f\u7528\u8fc7": 8, "\u73b0\u5728\u8003\u8651\u8fd9\u6837\u4e00\u79cd\u60c5\u51b5": 8, "\u5982\u679c\u67d0\u4e2a\u6d88\u8d39\u8005\u4e4b\u524d\u4ece\u672a\u4f7f\u7528\u8fc7\u8be5\u4fc3\u9500\u7801": 8, "\u800c\u662f\u5728\u51e0\u4e4e\u540c\u4e00\u65f6\u523b\u5c1d\u8bd5\u4f7f\u7528\u8be5\u4fc3\u9500\u7801\u4e24\u6b21": 8, "\u8fd9\u4f1a\u53d1\u751f\u4ec0\u4e48": 8, "\u6b63\u5982\u60a8\u6240\u770b\u5230\u7684": 8, "\u5e94\u7528\u7a0b\u5e8f\u901a\u8fc7\u4e00\u4e2a\u4e34\u65f6\u5b50\u72b6\u6001\u8fdb\u884c\u8f6c\u6362": 8, "\u4e5f\u5c31\u662f\u8bf4": 8, "\u5728\u8bf7\u6c42\u5904\u7406\u5b8c\u6210\u4e4b\u524d\u8fdb\u5165\u7136\u540e\u518d\u6b21\u9000\u51fa\u7684\u72b6\u6001": 8, "\u5728\u8fd9\u79cd\u60c5\u51b5\u4e0b": 8, "\u5b50\u72b6\u6001\u5728\u670d\u52a1\u5668\u5f00\u59cb\u5904\u7406\u7b2c\u4e00\u4e2a\u8bf7\u6c42\u65f6\u5f00\u59cb": 8, "\u5728\u66f4\u65b0\u6570\u636e\u5e93\u4ee5\u6307\u793a\u60a8\u5df2\u7ecf\u4f7f\u7528\u8fc7\u6b64\u4ee3\u7801\u65f6\u7ed3\u675f": 8, "\u8fd9\u5f15\u5165\u4e86\u4e00\u4e2a\u5c0f\u7684\u6bd4\u8d5b\u7a97\u53e3": 8, "\u5728\u6b64\u671f\u95f4\u60a8\u53ef\u4ee5\u6839\u636e\u9700\u8981\u591a\u6b21\u7533\u8bf7\u6298\u6263": 8, "\u8fd9\u79cd\u653b\u51fb\u6709\u5f88\u591a\u53d8\u4f53": 8, "\u5305\u62ec": 8, "\u591a\u6b21\u5151\u6362\u793c\u54c1\u5361": 8, "\u5bf9\u4ea7\u54c1\u8fdb\u884c\u591a\u6b21\u8bc4\u7ea7": 8, "\u63d0\u53d6\u6216\u8f6c\u8d26\u8d85\u8fc7\u60a8\u8d26\u6237\u4f59\u989d\u7684\u73b0\u91d1": 8, "\u91cd\u590d\u4f7f\u7528\u5355\u4e2a\u9a8c\u8bc1\u7801\u89e3\u51b3\u65b9\u6848": 8, "\u7ed5\u8fc7\u53cd\u66b4\u529b\u7834\u89e3\u901f\u7387\u9650\u5236": 8, "\u9650\u5236\u8d85\u9650\u662f\u6240\u8c13\u7684": 8, "\u68c0\u67e5\u65f6\u95f4\u5230\u4f7f\u7528\u65f6\u95f4": 8, "toctou": 8, "\u7f3a\u9677\u7684\u4e00\u4e2a\u5b50\u7c7b\u578b": 8, "\u5728\u672c\u4e3b\u9898\u7684\u540e\u9762\u90e8\u5206": 8, "\u6211\u4eec\u5c06\u4ecb\u7ecd\u4e00\u4e9b\u4e0d\u5c5e\u4e8e\u8fd9\u4e9b\u7c7b\u522b\u7684\u7ade\u4e89\u6761\u4ef6\u6f0f\u6d1e\u793a\u4f8b": 8, "\u6761\u4ef6\u7ade\u4e89": 0, "\u524d\u8a00": 0, "cross": 0, "site": [0, 1], "script": [0, 2, 3, 5], "what": [0, 5], "i": [0, 5], "xss": [0, 3, 5], "how": 0, "doe": [0, 1], "work": [0, 2], "proof": [0, 1, 5], "concept": [0, 1, 2, 3, 5], "ar": [0, 1, 2, 3, 5], "type": [0, 1, 3, 5], "attack": [0, 5], "reflect": [0, 2, 3], "store": 0, "dom": 0, "base": [0, 1, 3, 5], "can": [0, 1, 2, 3, 5], "us": [0, 1, 2, 3], "impact": [0, 5], "vulner": [0, 1, 3], "find": [0, 1, 2, 3, 5], "test": [0, 1, 3], "content": [0, 2, 3, 5], "secur": [0, 3], "polici": [0, 3], "dangl": 0, "markup": 0, "inject": [0, 2, 5], "prevent": [0, 3, 5], "common": [0, 1, 2], "question": 0, "about": [0, 1], "partli": 3, "interf": 3, "success": [1, 3], "unintention": 3, "address": [2, 3], "account": [1, 3], "password": 3, "make": [1, 2, 3, 5], "fund": 3, "transfer": 3, "role": 3, "kei": [2, 3], "condit": 3, "must": 3, "reason": 3, "modifi": [1, 3], "permiss": 3, "specif": [1, 2, 3], "issu": [0, 3], "one": [2, 3, 5], "reli": [2, 3], "sole": 3, "made": 3, "track": 3, "No": 3, "unpredict": 3, "whose": 3, "cannot": [1, 3], "guess": 3, "know": 3, "suppos": [2, 3, 5], "host": [2, 3], "www": 3, "form": [2, 3], "urlencod": 3, "length": 3, "30": 3, "yvthwsztyeqkapzeq5ghgtvlyxhfsaf": 3, "wiener": 3, "meet": 3, "trigger": [1, 3], "reset": 3, "With": 3, "bodi": [1, 3], "method": 3, "hidden": [1, 3], "name": [1, 3], "pwned": 3, "evil": [2, 3], "net": [2, 3], "0": [1, 3], "happen": [1, 3], "log": [2, 3], "automat": 3, "assum": [1, 3], "samesit": 3, "treat": [3, 5], "although": [1, 3], "relat": [3, 5], "add": [1, 2, 3], "authent": [1, 2, 3], "certif": 3, "creat": [1, 3], "cumbersom": 3, "particularli": 3, "desir": [1, 3], "larg": 3, "number": [1, 2, 3], "quirk": 3, "easiest": 3, "built": 3, "profession": 3, "anywher": 3, "right": 3, "click": [1, 3, 5], "menu": [3, 5], "engag": 3, "minu": 3, "ad": [1, 3], "tweak": 3, "variou": [2, 3, 5], "fine": 3, "tune": 3, "aspect": 3, "unusu": [2, 3], "deal": 3, "quirki": 3, "featur": 3, "copi": 3, "apprentic": [1, 2, 5], "deliveri": 3, "essenti": 3, "onto": 3, "done": [2, 3], "feed": 3, "Or": 3, "popular": [2, 3], "wait": 3, "self": [1, 3], "singl": [1, 3], "mai": [1, 2, 3], "extern": [2, 3, 5], "directli": [2, 3], "preced": 3, "look": [1, 3, 5], "v": 3, "nowadai": 3, "bypass": 3, "anti": 3, "deploi": 3, "both": [1, 3, 5], "encount": [1, 3], "secret": 3, "share": [0, 3], "attempt": [3, 5], "correct": 3, "restrict": [1, 2, 3], "sinc": [3, 5], "enforc": [1, 3], "lax": 3, "default": 3, "propos": 3, "standard": [1, 2, 3], "adopt": [1, 3], "futur": [2, 3], "refer": 3, "defend": 3, "verifi": 3, "descript": 3, "potenti": [1, 2, 3], "materi": 3, "properli": [1, 2, 3], "implement": [1, 2, 3], "see": 3, "discuss": [1, 2], "protect": [1, 2, 5], "against": [0, 1, 2, 5], "wa": [1, 2, 5], "written": 2, "collabor": 2, "portswigg": 2, "research": 2, "class": 2, "present": 2, "misconfigur": 2, "bitcoin": 2, "bounti": 2, "outsid": 2, "given": 2, "extend": 2, "flexibl": [1, 2], "sop": 2, "provid": [1, 2, 5], "forgeri": [0, 2, 5], "limit": 2, "abil": 2, "defin": [1, 2], "mani": 2, "year": 2, "ago": 2, "steal": 2, "privat": 2, "anoth": [1, 2, 5], "consequ": [1, 2], "approach": 2, "devis": [1, 2], "constraint": [1, 2], "subdomain": 2, "third": 2, "parti": 2, "protocol": [1, 2, 5], "associ": 2, "properti": 2, "permit": [1, 2], "exchang": 2, "try": 2, "modern": [2, 5], "Their": 2, "mistak": 2, "overli": 2, "lenient": 2, "everyth": 2, "maintain": 2, "list": 2, "ongo": 2, "effort": 2, "risk": [2, 5], "easi": 2, "rout": 2, "One": 2, "state": 2, "consid": [1, 2], "sessionid": 2, "respond": 2, "200": 2, "ok": 2, "true": [1, 2], "mean": 2, "absolut": [1, 2], "api": 2, "could": 2, "req": 2, "new": 2, "xmlhttprequest": 2, "onload": 2, "reqlisten": 2, "open": [2, 5], "withcredenti": 2, "responsetext": 2, "support": [1, 2], "multipl": [1, 2], "suppli": [2, 5], "compar": [1, 2], "appear": [2, 5], "grant": 2, "innoc": 2, "organ": 2, "decid": 2, "yet": 2, "And": 2, "rule": [2, 5], "match": 2, "prefix": 2, "suffix": 2, "regular": [2, 5], "express": 2, "lead": [2, 5], "unintend": 2, "end": [2, 5], "regist": 2, "hackersnorm": 2, "begin": 2, "redirect": 2, "serial": 2, "file": [1, 2], "sandbox": [1, 2], "local": 2, "trick": [1, 2], "satisfi": 2, "even": [1, 2], "correctli": 2, "establish": [1, 2, 5], "two": [1, 2], "requestapikei": 2, "Then": 2, "rigor": 2, "plain": 2, "posit": [1, 2], "intercept": [1, 2], "step": 2, "spoof": 2, "transmit": [2, 5], "under": 2, "otherwis": [1, 2], "robust": 2, "usag": [1, 2], "endpoint": [2, 5], "flag": [1, 2], "practition": [2, 5], "presenc": 2, "refus": 2, "unauthent": 2, "brows": [2, 5], "ip": 2, "space": 2, "held": 2, "lower": 2, "further": 2, "reader": 2, "doc1": 2, "pdf": 2, "internet": [1, 2], "proxi": [2, 5], "expert": 2, "pivot": 2, "primarili": 2, "therefor": [1, 2], "problem": 2, "should": [1, 2], "seem": 2, "obviou": 2, "particular": 2, "readili": 2, "respect": 2, "alon": 2, "suffici": 2, "never": 2, "replac": 2, "forg": [1, 2], "continu": 2, "manag": 2, "addit": 2, "interfac": 1, "decoi": 1, "perhap": 1, "button": [1, 5], "win": 1, "prize": 1, "unknowingli": 1, "deceiv": 1, "press": [1, 5], "payment": 1, "upon": 1, "incorpor": [1, 5], "invis": 1, "sai": 1, "overlaid": 1, "top": 1, "anticip": 1, "wherea": 1, "entir": 1, "without": 1, "knowledg": 1, "nonc": 1, "load": 1, "pass": 1, "behav": 1, "layer": 1, "style": 1, "tag": 1, "head": 1, "target_websit": 1, "rel": 1, "width": 1, "128px": 1, "height": 1, "opac": 1, "00001": 1, "z": 1, "2": 1, "decoy_websit": 1, "300px": 1, "400px": 1, "div": 1, "id": 1, "precis": 1, "overlap": 1, "accur": 1, "regardless": 1, "screen": 1, "size": 1, "platform": 1, "stack": 1, "close": 1, "transpar": 1, "threshold": 1, "76": 1, "firefox": 1, "achiev": 1, "abov": 1, "fairli": 1, "tediou": 1, "wild": 1, "instead": 1, "frameabl": 1, "overlai": 1, "matter": 1, "complet": 1, "submiss": 1, "prepopul": 1, "prior": 1, "text": 1, "befor": [1, 5], "choos": [1, 5], "whenev": 1, "capabl": 1, "enact": 1, "through": 1, "break": 1, "proprietari": 1, "ons": 1, "extens": 1, "noscript": 1, "window": 1, "buster": 1, "set": [1, 5], "oper": 1, "inde": 1, "workaround": 1, "html5": 1, "attribut": 1, "navig": 1, "omit": 1, "neutral": 1, "specifi": 1, "level": 1, "disabl": 1, "inhibit": 1, "far": 1, "histor": 1, "boost": 1, "facebook": 1, "potenc": 1, "reveal": 1, "carrier": 1, "straightforward": 1, "first": 1, "necessit": 1, "bui": 1, "someth": 1, "retail": 1, "item": 1, "shop": 1, "basket": 1, "divis": 1, "Such": 1, "consider": 1, "care": 1, "perspect": 1, "stealthi": 1, "commonli": 1, "seen": 1, "driven": 1, "constrain": 1, "conform": 1, "prevail": 1, "best": 1, "commun": [1, 5], "compon": 1, "complianc": 1, "introduc": [1, 5], "unoffici": 1, "explor": 1, "8": 1, "rapidli": 1, "owner": 1, "object": 1, "inclus": 1, "prohibit": 1, "deni": 1, "direct": [1, 5], "sameorigin": 1, "consist": 1, "across": 1, "safari": 1, "12": 1, "conjunct": 1, "multi": 1, "strategi": 1, "separ": 1, "semicolon": 1, "resourc": [0, 1], "ancestor": 1, "none": 1, "broadli": 1, "equival": 1, "onli": [1, 5], "give": 5, "wide": 5, "initi": 5, "live": 5, "asynchron": 5, "histori": 5, "tab": 5, "turn": 5, "sent": 5, "forward": 5, "configur": [0, 5], "dialog": 5, "fly": 5, "repeat": 5, "now": 5, "edit": 5, "enter": 5, "either": 5, "panel": 5, "were": 5, "resend": 5, "necessari": 5, "reach": 5, "surfac": 5, "drop": 5, "stale": 5, "updat": 5, "pencil": 5, "icon": 5, "next": 5, "wizard": 5, "attach": 5, "clone": 5, "reconnect": 5, "disconnect": 5, "show": 5, "principl": 5, "xml": 5, "entiti": 5, "blind": 5, "band": 5, "oast": 5, "tamper": 5, "carlo": 5, "again": 5, "render": 5, "td": 5, "plai": 5, "tend": 5, "flaw": 5, "misplac": 5, "trust": 5, "decis": 5, "hijack": 5, "guidelin": 5, "wss": 5, "tl": 5, "certainli": 5, "don": 5, "avoid": 5, "safe": 5, "more": [1, 3, 6], "read": [1, 3, 6], "victim_websit": 1, "note": 3, "defenc": 0, "cor": 0, "relax": 0}, "objects": {}, "objtypes": {}, "objnames": {}, "titleterms": {"portswigg": 0, "\u5b66\u4e60\u6307\u5357": 0, "\u7d22\u5f15": 0, "cross": [2, 3, 5, 6], "site": [2, 3, 5, 6], "script": [1, 6], "what": [1, 2, 3, 6], "i": [1, 2, 3, 6], "xss": [1, 2, 6], "how": [1, 2, 3, 5, 6], "doe": [3, 6], "work": [3, 6], "lab": [1, 2, 3, 5, 6], "proof": 6, "concept": 6, "ar": 6, "type": 6, "attack": [1, 2, 3, 6], "reflect": 6, "store": 6, "dom": [1, 6], "base": [2, 6], "can": 6, "us": [5, 6], "impact": [3, 6], "vulner": [2, 5, 6], "find": 6, "test": [5, 6], "content": [1, 6], "secur": [1, 2, 5, 6], "polici": [1, 2, 6], "read": [2, 5], "more": [2, 5], "dangl": 6, "markup": 6, "inject": 6, "prevent": [1, 2, 6], "common": [3, 6], "question": 6, "about": 6, "\u6761\u4ef6\u7ade\u4e89": [7, 8], "\u524d\u8a00": 7, "\u5b9a\u4e49": 8, "\u9650\u5236\u8d85\u9650\u6761\u4ef6\u7ade\u4e89": 8, "\u670d\u52a1\u7aef": 0, "\u5ba2\u6237\u7aef": 0, "request": [2, 3], "forgeri": 3, "csrf": 3, "note": 5, "construct": [1, 3], "deliv": 3, "exploit": [2, 3, 5], "defenc": 3, "against": 3, "origin": 2, "resourc": 2, "share": 2, "cor": 2, "same": 2, "relax": 2, "aris": 2, "from": 2, "configur": 2, "issu": 2, "server": 2, "gener": [2, 5], "acao": 2, "header": 2, "client": 2, "specifi": 2, "error": 2, "pars": 2, "whitelist": 2, "null": 2, "valu": 2, "via": 2, "trust": 2, "relationship": 2, "break": 2, "tl": 2, "poorli": 2, "intranet": 2, "without": 2, "credenti": 2, "proper": 2, "onli": 2, "allow": 2, "avoid": 2, "wildcard": 2, "intern": 2, "network": 2, "substitut": 2, "side": 2, "clickjack": 1, "ui": 1, "redress": 1, "basic": 1, "clickbandit": 1, "prefil": 1, "form": 1, "input": 1, "frame": 1, "bust": 1, "combin": 1, "multistep": 1, "x": 1, "option": 1, "csp": 1, "websocket": 5, "manipul": 5, "traffic": 5, "intercept": 5, "modifi": 5, "messag": 5, "replai": 5, "new": 5, "connect": 5, "handshak": 5}, "envversion": {"sphinx.domains.c": 3, "sphinx.domains.changeset": 1, "sphinx.domains.citation": 1, "sphinx.domains.cpp": 9, "sphinx.domains.index": 1, "sphinx.domains.javascript": 3, "sphinx.domains.math": 2, "sphinx.domains.python": 4, "sphinx.domains.rst": 2, "sphinx.domains.std": 2, "sphinx.ext.viewcode": 1, "sphinx": 58}, "alltitles": {"\u6761\u4ef6\u7ade\u4e89": [[7, "id1"], [8, "id1"]], "\u524d\u8a00": [[7, "id2"]], "\u5b9a\u4e49": [[8, "id2"]], "\u9650\u5236\u8d85\u9650\u6761\u4ef6\u7ade\u4e89": [[8, "id3"]], "Labs": [[2, "labs"], [5, "labs"], [6, "labs"], [1, "labs"], [3, "labs"]], "Read more": [[2, "read-more"], [2, "id1"], [2, "id2"], [2, "id3"], [5, "read-more"], [5, "id1"]], "Cross-origin resource sharing (CORS)": [[2, "cross-origin-resource-sharing-cors"]], "What is CORS (cross-origin resource sharing)?": [[2, "what-is-cors-cross-origin-resource-sharing"]], "Same-origin policy": [[2, "same-origin-policy"]], "Relaxation of the same-origin policy": [[2, "relaxation-of-the-same-origin-policy"]], "Vulnerabilities arising from CORS configuration issues": [[2, "vulnerabilities-arising-from-cors-configuration-issues"]], "Server-generated ACAO header from client-specified Origin header": [[2, "server-generated-acao-header-from-client-specified-origin-header"]], "Errors parsing Origin headers": [[2, "errors-parsing-origin-headers"]], "Whitelisted null origin value": [[2, "whitelisted-null-origin-value"]], "Exploiting XSS via CORS trust relationships": [[2, "exploiting-xss-via-cors-trust-relationships"]], "Breaking TLS with poorly configured CORS": [[2, "breaking-tls-with-poorly-configured-cors"]], "Intranets and CORS without credentials": [[2, "intranets-and-cors-without-credentials"]], "How to prevent CORS-based attacks": [[2, "how-to-prevent-cors-based-attacks"]], "Proper configuration of cross-origin requests": [[2, "proper-configuration-of-cross-origin-requests"]], "Only allow trusted sites": [[2, "only-allow-trusted-sites"]], "Avoid whitelisting null": [[2, "avoid-whitelisting-null"]], "Avoid wildcards in internal networks": [[2, "avoid-wildcards-in-internal-networks"]], "CORS is not a substitute for server-side security policies": [[2, "cors-is-not-a-substitute-for-server-side-security-policies"]], "Note": [[5, "note"]], "Testing for WebSockets security vulnerabilities": [[5, "testing-for-websockets-security-vulnerabilities"]], "WebSockets": [[5, "websockets"]], "Manipulating WebSocket traffic": [[5, "manipulating-websocket-traffic"]], "Intercepting and modifying WebSocket messages": [[5, "intercepting-and-modifying-websocket-messages"]], "Replaying and generating new WebSocket messages": [[5, "replaying-and-generating-new-websocket-messages"]], "Manipulating WebSocket connections": [[5, "manipulating-websocket-connections"]], "WebSockets security vulnerabilities": [[5, "websockets-security-vulnerabilities"]], "Manipulating WebSocket messages to exploit vulnerabilities": [[5, "manipulating-websocket-messages-to-exploit-vulnerabilities"]], "Manipulating the WebSocket handshake to exploit vulnerabilities": [[5, "manipulating-the-websocket-handshake-to-exploit-vulnerabilities"]], "Using cross-site WebSockets to exploit vulnerabilities": [[5, "using-cross-site-websockets-to-exploit-vulnerabilities"]], "How to secure a WebSocket connection": [[5, "how-to-secure-a-websocket-connection"]], "Cross-site scripting": [[6, "cross-site-scripting"]], "What is cross-site scripting (XSS)?": [[6, "what-is-cross-site-scripting-xss"]], "How does XSS work?": [[6, "how-does-xss-work"]], "XSS proof of concept": [[6, "xss-proof-of-concept"]], "What are the types of XSS attacks?": [[6, "what-are-the-types-of-xss-attacks"]], "Reflected cross-site scripting": [[6, "reflected-cross-site-scripting"]], "Stored cross-site scripting": [[6, "stored-cross-site-scripting"]], "DOM-based cross-site scripting": [[6, "dom-based-cross-site-scripting"]], "What can XSS be used for?": [[6, "what-can-xss-be-used-for"]], "Impact of XSS vulnerabilities": [[6, "impact-of-xss-vulnerabilities"]], "How to find and test for XSS vulnerabilities": [[6, "how-to-find-and-test-for-xss-vulnerabilities"]], "Content security policy": [[6, "content-security-policy"]], "Dangling markup injection": [[6, "dangling-markup-injection"]], "How to prevent XSS attacks": [[6, "how-to-prevent-xss-attacks"]], "Common questions about cross-site scripting": [[6, "common-questions-about-cross-site-scripting"]], "Clickjacking (UI redressing)": [[1, "clickjacking-ui-redressing"]], "What is clickjacking?": [[1, "what-is-clickjacking"]], "How to construct a basic clickjacking attack": [[1, "how-to-construct-a-basic-clickjacking-attack"]], "Clickbandit": [[1, "clickbandit"]], "Clickjacking with prefilled form input": [[1, "clickjacking-with-prefilled-form-input"]], "Frame busting scripts": [[1, "frame-busting-scripts"]], "Combining clickjacking with a DOM XSS attack": [[1, "combining-clickjacking-with-a-dom-xss-attack"]], "Multistep clickjacking": [[1, "multistep-clickjacking"]], "How to prevent clickjacking attacks": [[1, "how-to-prevent-clickjacking-attacks"]], "X-Frame-Options": [[1, "x-frame-options"]], "Content Security Policy (CSP)": [[1, "content-security-policy-csp"]], "Cross-site request forgery (CSRF)": [[3, "cross-site-request-forgery-csrf"]], "What is CSRF?": [[3, "what-is-csrf"]], "What is the impact of a CSRF attack?": [[3, "what-is-the-impact-of-a-csrf-attack"]], "How does CSRF work?": [[3, "how-does-csrf-work"]], "How to construct a CSRF attack": [[3, "how-to-construct-a-csrf-attack"]], "How to deliver a CSRF exploit": [[3, "how-to-deliver-a-csrf-exploit"]], "Common defences against CSRF": [[3, "common-defences-against-csrf"]], "PortSwigger \u5b66\u4e60\u6307\u5357": [[0, "portswigger"]], "\u670d\u52a1\u7aef": [[0, null]], "\u5ba2\u6237\u7aef": [[0, null]], "\u7d22\u5f15": [[0, "id1"]]}, "indexentries": {}})