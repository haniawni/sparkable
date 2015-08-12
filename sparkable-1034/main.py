#!/usr/bin/env python
# TODO: REPLACE ALL guess-that-song content
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import os
import webapp2
import jinja2
from google.appengine.ext import ndb
from google.appengine.api import users
import random
import logging
import json



JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class Person(ndb.Model):
    fb_url = ndb.StringProperty()
    # facebook_id = ndb.StringProperty()
    name = ndb.StringProperty(required=True)
    # opinions = ndb.StructuredProperty(Opinion, repeated=True)


class Opinion(ndb.Model):
    origin = ndb.StructuredProperty(Person, required=True)
    target = ndb.StructuredProperty(Person, required=True)
    rating = ndb.FloatProperty(required=True)
    confidence = ndb.FloatProperty(required=True)


class HomeHandler(webapp2.RequestHandler):
    def get(self):
            template = JINJA_ENVIRONMENT.get_template('templates/home.html')
            self.response.write(template.render())



class AddOpinionHandler(webapp2.RequestHandler):
    def get(self):
        #TODO: init with current user
        template = JINJA_ENVIRONMENT.get_template('templates/add_opinion.html')
        self.response.write(template.render())

class SeeOpinionsHandler(webapp2.RequestHandler):
    def get(self):
        opinions=Opinion.query().fetch()
        num_opinions=len(opinions)

        template_values={"opinions": opinions, "num_opinions":num_opinions}
        template = JINJA_ENVIRONMENT.get_template('templates/see_opinions.html')
        self.response.write(template.render(template_values))


class SubmitPersonHandler(webapp2.RequestHandler):
    def post(self):
        name=self.request.get("name")
        fb_url=self.request.get("fb_url")
        response={}

        name_results=Person.query().filter(Person.name==name).fetch()
        if name_results:
            response["nameUnique"]=False

        else:
            response["nameUnique"]=True

        fb_results=Person.query().filter(Person.fb_url==fb_url).fetch()
        if fb_results:
            response["fb_urlUnique"]=False
        else:
            response["fb_urlUnique"]=True

        if response["nameUnique"] and response["fb_urlUnique"]:
            person=Person(name=name,fb_url=fb_url)
            person.put()
        self.response.headers['Content-Type'] = "application/json"
        self.response.out.write(json.dumps(response))

class SubmitOpinionHandler(webapp2.RequestHandler):
    def post(self):
        origin=self.request.get("origin")
        target=self.request.get("target")
        rating=self.request.get("rating")
        confidence=self.request.get("confidence")
        response={}

        origin_results=Person.query().filter(Person.name==origin).fetch()
        if origin_results:
            response["originValid"]=True
            origin_person=origin_results[0]
        else:
            response["originValid"]=False
        target_results=Person.query().filter(Person.name==target).fetch()
        if target_results:
            response["targetValid"]=True
            target_person=target_results[0]
        else:
            response["targetValid"]=False

        if response["originValid"] and response["targetValid"]:
            print "BUTTS"
            opinion=Opinion(origin=origin_person,target=target_person,rating=float(rating), confidence=float(confidence))
            opinion.put()
        self.response.headers['Content-Type'] = "application/json"
        self.response.out.write(json.dumps(response))

class AboutHandler(webapp2.RequestHandler):
    def get(self):
        template = JINJA_ENVIRONMENT.get_template('templates/about.html')
        self.response.write(template.render())


app = webapp2.WSGIApplication([
    ('/', HomeHandler),
    ('/add_opinion', AddOpinionHandler),
    ('/submitPerson',SubmitPersonHandler),
    ('/submitOpinion',SubmitOpinionHandler),
    ('/see_opinions',SeeOpinionsHandler),
    ('/about', AboutHandler)
], debug=True)
