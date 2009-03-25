import httplib
import urllib2
'''SDLoader use httplib or urllib2 to get a address and sav it to a path.'''

SourceFile=urllib2.urlopen("http://ftp.gnu.org/gnu/wget/wget-1.10.1.tar.gz")
DestFile=open("wget.tat.gz",'w')
FileStr=SourceFile.read(100)
i=0
while FileStr:
    DestFile.write(FileStr)
    FileStr=SourceFile.read(100)
    i=i+1
    print i,len(FileStr)

SourceFile.close()
DestFile.close()
