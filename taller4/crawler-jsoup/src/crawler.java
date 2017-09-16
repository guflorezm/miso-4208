
import java.io.IOException;
import java.util.HashSet;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;


public class crawler {
	
    public static void main(String args[]) throws IOException{  
    	Document doc = Jsoup.connect("https://play.google.com/store/apps/category/FINANCE/collection/topselling_paid").timeout(0).get();
    	
    	Document detailDoc = null; 
    			
    	HashSet<String> hrefs = new HashSet<String>();
    	String href = null;
    	
    	Elements anchors = doc.getElementsByClass("card-click-target");
    	
    	String description = null;
    	String title = null;
    	String numberRatings = null;
    	String score = null;
    	
    	for(Element element : anchors ) {
    		href = "https://play.google.com" + element.attr("href").toString();
    		if(href == "https://play.google.com/store/apps/details?id=com.todo1.davivienda.mobileapp") {
    			hrefs.add(href);	
    		}    		
    	}
    	
    	for(String url : hrefs) {
    		detailDoc = Jsoup.connect(url).timeout(0).get();
    		description = detailDoc.select("[itemprop='description']").text();
    		title = detailDoc.select("[class='id-app-title']").text();
    		numberRatings = detailDoc.select("[class='id-app-title']").text(); 
    		score = detailDoc.select("[class='score']").text();
    	}
    }	

}
