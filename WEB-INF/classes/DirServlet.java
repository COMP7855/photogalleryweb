import javax.servlet.http.*;
import javax.servlet.*;
import java.io.*;
public class DirServlet extends HttpServlet {
  public void doGet(HttpServletRequest request, HttpServletResponse response)
      throws ServletException, IOException {
      response.setContentType("text/html");
      PrintWriter out = response.getWriter();
      out.println(getListing("C:/tomcat/webapps/photogalleryweb/images"));
  }
  private String getListing(String path) {
     String dirList =  null; //new string
      File dir = new File(path); //new directory
      String[] chld = dir.list(); //new array 
	  
      for(int i = 0; i < chld.length; i++){
         if (i == chld.length - 1)
			dirList += chld[i];
		else
			dirList += chld[i]+ ",";
            //dirList += "<li><button type=\"button\">"+chld[i]+"</button></li>";
         //else
            //dirList += chld[i] +"a";       
      }
	  
     return dirList;
	  
  }
}
