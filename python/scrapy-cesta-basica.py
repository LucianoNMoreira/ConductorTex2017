# -*- coding: utf-8 -*-
# Run: scrapy runspider scrapy-cesta-basica.py -t json -o output.json
import scrapy
import urlparse
import json
import os

from scrapy import signals
from scrapy.xlib.pydispatch import dispatcher

class State(scrapy.Item):
    name = scrapy.Field()
    value = scrapy.Field()

class CestaBasicaScrapy(scrapy.Spider):
    name = 'scrapy-cesta-basica'
 
    def __init__(self):
        self.start_urls = ['http://www.pesquisaprecomedio.com.br/preco-medio-alimentacao.php']
        dispatcher.connect(self.spider_closed, signals.spider_closed)
 
    def parse(self, response):
        build_full_url = lambda link: urlparse.urljoin(response.url, link)
 
        for qsel in response.css("div.map > .btn-balao"):
            it = State()
            it['name'] = qsel.css('div[class^="uf-"]::text')[0].extract()
            it['value'] = qsel.css('::attr(data-valor)')[0].extract()
 
            yield it

    def spider_closed(self, spider):
        print "cabou"
        os.system("python create-final-json.py")
        # import create_final_json