(defproject test-project "0.1.0-SNAPSHOT"
  :description "Test Leiningen project for maven-dependency-submission-action"
  :url "http://example.com/test-project"
  :license {:name "EPL-2.0 OR GPL-2.0-or-later WITH Classpath-exception-2.0"
            :url "https://www.eclipse.org/legal/epl-2.0/"}
  :dependencies [[org.clojure/clojure "1.11.1"]
                 [ring/ring-core "1.9.5"]
                 [compojure "1.7.0"]
                 [cheshire "5.11.0"]]
  :repl-options {:init-ns test-project.core})

